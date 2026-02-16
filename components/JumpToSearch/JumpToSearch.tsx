"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import redirectsData from "@/redirects.json";

type SectionItems = Record<string, { label: string; href: string; icon: React.ElementType }[]>;

function flattenNavItems(sectionItems: SectionItems): { label: string; href: string }[] {
    const home = { label: "Home", href: "/" };
    const items = [home];
    Object.values(sectionItems).forEach((section) => {
        section.forEach((item) => items.push({ label: item.label, href: item.href }));
    });
    return items;
}

type RedirectsJson = Record<string, { href: string; title: string }>;

function getSlugRoutes(): { slug: string; label: string; href: string }[] {
    const r = redirectsData as RedirectsJson;
    return Object.entries(r).map(([slug, { title }]) => ({
        slug,
        label: title,
        href: `/${slug}`,
    }));
}

export function JumpToSearch({ sectionItems, onNavigate }: { sectionItems: SectionItems; onNavigate?: () => void }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const allItems = useMemo(() => flattenNavItems(sectionItems), [sectionItems]);
    const internalItems = useMemo(() => allItems.filter((item) => !item.href.startsWith("http")), [allItems]);
    const externalItems = useMemo(() => allItems.filter((item) => item.href.startsWith("http")), [allItems]);
    const slugRoutes = useMemo(() => getSlugRoutes(), []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        const onOpenPalette = () => setOpen(true);
        document.addEventListener("keydown", down);
        window.addEventListener("command-palette:open", onOpenPalette);
        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("command-palette:open", onOpenPalette);
        };
    }, []);

    const handleSelect = (href: string) => {
        if (href.startsWith("http")) {
            window.open(href, "_blank", "noopener,noreferrer");
        } else {
            if (href === "/" && pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push(href);
            }
        }
        onNavigate?.();
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className="w-full justify-start gap-2 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Jump to page (⌘K)"
            >
                <Search className="size-4 shrink-0" />
                <span className="truncate">Jump to...</span>
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-0.5 rounded border border-white/20 px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
                    ⌘K
                </kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                title="Jump to"
                description="Type a page name or path to jump there."
                className="border-white/20 bg-white/75 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/75 [&_[data-slot=command]]:bg-transparent"
            >
                <CommandInput placeholder="Search pages..." />
                <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {internalItems.map((item) => (
                            <CommandItem
                                key={`${item.label}-${item.href}`}
                                value={`${item.label} ${item.href}`}
                                onSelect={() => handleSelect(item.href)}
                                keywords={[item.label, item.href]}
                            >
                                <span>{item.label}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Dynamic routes">
                        {slugRoutes.map((item) => (
                            <CommandItem
                                key={item.href}
                                value={`${item.label} ${item.slug} ${item.href}`}
                                onSelect={() => handleSelect(item.href)}
                                keywords={[item.label, item.slug, item.href]}
                            >
                                <span className="font-medium">/{item.slug}</span>
                                <span className="truncate text-muted-foreground">{item.label}</span>
                                <span className="ml-auto text-xs text-muted-foreground">Dynamic</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="External">
                        {externalItems.map((item) => (
                            <CommandItem
                                key={`${item.label}-${item.href}`}
                                value={`${item.label} ${item.href}`}
                                onSelect={() => handleSelect(item.href)}
                                keywords={[item.label, item.href]}
                            >
                                <span>{item.label}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
