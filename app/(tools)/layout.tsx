"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { ToolsCommandPalette } from "@/components/ToolsCommandPalette/ToolsCommandPalette";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background px-4">
                <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground underline-offset-2 hover:text-foreground"
                >
                    ← Back to home
                </Link>
                <div className="flex items-center gap-2">
                    <ToolsCommandPalette />
                    <ThemeToggle />
                </div>
            </header>
            {children}
        </div>
    );
}
