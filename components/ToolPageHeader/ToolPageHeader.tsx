"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS_LIST, recordRecentToolVisit } from "@/lib/tools";

type ToolPageHeaderProps = {
    title: string;
    description: string;
};

export function ToolPageHeader({ title, description }: ToolPageHeaderProps) {
    const pathname = usePathname();

    useEffect(() => {
        const currentTool = TOOLS_LIST.find((tool) => tool.href === pathname);
        if (!currentTool) return;
        recordRecentToolVisit(currentTool.id);
    }, [pathname]);

    return (
        <div className="surface-panel relative mb-8 overflow-hidden rounded-[1.75rem] border border-white/55 px-5 py-6 dark:border-white/10 sm:px-7 sm:py-7">
            <div className="absolute inset-0 surface-grid opacity-[0.14] dark:opacity-[0.08]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(1,114,175,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(80,179,132,0.14),transparent_24%)]" />
            <div className="relative">
                <Link
                    href="/tools"
                    className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
                >
                    <span className="font-mono text-xs text-primary">←</span>
                    <span className="eyebrow tracking-[0.24em] text-foreground/58">Back to tools</span>
                </Link>
                <h1 className="max-w-[14ch] text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
                <p className="mt-3 max-w-2xl text-balance text-base leading-7 text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
