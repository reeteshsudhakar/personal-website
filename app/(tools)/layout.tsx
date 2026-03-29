"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { ToolsCommandPalette } from "@/components/ToolsCommandPalette/ToolsCommandPalette";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-20 border-b border-white/45 bg-background/70 px-4 backdrop-blur-xl dark:border-white/10">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
                    >
                        <span className="font-mono text-xs text-primary transition-transform duration-200 group-hover:-translate-x-0.5">
                            ←
                        </span>
                        <span>
                            <span className="eyebrow block text-foreground/45">Reetesh Sudhakar</span>
                            <span className="font-display text-base font-medium text-foreground">Back to home</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ToolsCommandPalette />
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
}
