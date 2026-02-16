"use client";

import { useMediaQuery } from "@/lib/use-media-query";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const OPEN_PALETTE_EVENT = "command-palette:open";

export default function ResumeView() {
    const isLargeScreen = useMediaQuery("(min-width: 48em)");

    const openPalette = () => {
        window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
    };

    return (
        <>
            {isLargeScreen ? (
                <iframe
                    src="/resume.pdf"
                    className="absolute bottom-0 left-[220px] right-0 top-0 m-0 h-full w-[calc(100%-220px)] border-0 overflow-hidden p-0"
                    title="Resume PDF"
                />
            ) : (
                <iframe
                    src="/resume.pdf"
                    className="absolute bottom-0 left-0 right-0 top-[60px] m-0 h-full w-full border-0 overflow-hidden p-0"
                    title="Resume PDF"
                />
            )}
            <Button
                variant="secondary"
                size="sm"
                onClick={openPalette}
                className="fixed bottom-4 right-4 z-10 gap-2 border border-border/50 bg-background/90 shadow-lg backdrop-blur-sm hover:bg-background"
                aria-label="Open jump to menu (⌘K doesn’t work inside PDF)"
            >
                <Search className="size-4" />
                Jump to
            </Button>
        </>
    );
}
