"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navbarSection1Items, fullName } from "@/lib/constants";
import {
    NavbarFooter,
    NavbarSectionLinks,
    NavbarSectionLinksSmall,
    NavbarTextBlurb,
} from "@/components/NavbarSections/NavbarSections";
import { JumpToSearch } from "@/components/JumpToSearch/JumpToSearch";
import { ToolsCommandPalette } from "@/components/ToolsCommandPalette/ToolsCommandPalette";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function AppWrapper({ children }: React.PropsWithChildren) {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const isMobile = useIsMobile();
    const isLargeScreen = !isMobile;
    const pathName = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="flex size-full min-h-screen items-center justify-center">
                <Spinner className="size-10 text-primary" />
            </div>
        );
    }

    const isToolsRoute = pathName?.startsWith("/tools");

    return (
        <div className="flex min-h-screen">
            <Toaster position="bottom-center" />

            {/* Mobile header - only show if not on tools route */}
            {!isLargeScreen && !isToolsRoute && (
                <header className="fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-between border-b border-border bg-black px-4">
                    <div className="flex items-center gap-2">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                    <Menu className="size-5" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex w-[220px] flex-col overflow-hidden border-r bg-black p-0"
                            >
                                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                                <ScrollArea className="min-h-0 flex-1">
                                    <div className="flex flex-col gap-4 pt-6 px-5 pb-4">
                                        <Link
                                            href="/"
                                            className="font-black text-white no-underline transition-all duration-200 hover:text-[#50B384] hover:[text-shadow:0_0_12px_currentColor]"
                                            onClick={(e) => {
                                                if (pathName === "/") {
                                                    e.preventDefault();
                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                }
                                                setOpen(false);
                                            }}
                                        >
                                            {fullName}
                                        </Link>
                                        <NavbarTextBlurb align="left" />
                                        {pathName?.startsWith("/tools") ? (
                                            <ToolsCommandPalette />
                                        ) : (
                                            <JumpToSearch
                                                sectionItems={navbarSection1Items}
                                                onNavigate={() => setOpen(false)}
                                            />
                                        )}
                                        <NavbarSectionLinksSmall
                                            sectionItems={navbarSection1Items}
                                            pathName={pathName}
                                            onLinkClick={() => setOpen(false)}
                                        />
                                    </div>
                                </ScrollArea>
                                <div className="shrink-0 border-t border-border p-4">
                                    <NavbarFooter />
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Link
                            href="/"
                            className="font-black text-white no-underline transition-all duration-200 hover:text-[#50B384] hover:[text-shadow:0_0_12px_currentColor]"
                            onClick={(e) => {
                                if (pathName === "/") {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                        >
                            {fullName}
                        </Link>
                    </div>
                </header>
            )}

            {/* Desktop sidebar - only show if not on tools route */}
            {isLargeScreen && !isToolsRoute && (
                <aside className="fixed left-0 top-0 z-20 flex h-full w-[220px] flex-col border-r border-border bg-black py-4">
                    <div className="flex flex-col items-center gap-4 px-3">
                        <Link
                            href="/"
                            className="font-black text-white no-underline transition-all duration-200 hover:text-[#50B384] hover:[text-shadow:0_0_12px_currentColor]"
                            onClick={(e) => {
                                if (pathName === "/") {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                        >
                            {fullName}
                        </Link>
                        <NavbarTextBlurb />
                        {pathName?.startsWith("/tools") ? (
                            <ToolsCommandPalette />
                        ) : (
                            <JumpToSearch sectionItems={navbarSection1Items} />
                        )}
                    </div>
                    <ScrollArea className="min-h-0 flex-1 px-2">
                        <div className="flex flex-col py-3">
                            <NavbarSectionLinks sectionItems={navbarSection1Items} pathName={pathName} />
                        </div>
                    </ScrollArea>
                    <div className="mt-auto p-4">
                        <NavbarFooter />
                    </div>
                </aside>
            )}

            {/* Main content */}
            <main
                className={`min-h-screen flex-1 ${!isLargeScreen && !isToolsRoute ? "pt-14" : ""}`}
                style={isLargeScreen && !isToolsRoute ? { marginLeft: 220 } : undefined}
            >
                {children}
            </main>
        </div>
    );
}

export default AppWrapper;
