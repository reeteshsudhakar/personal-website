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
        <>
            <Link
                href="/tools"
                className="mb-6 inline-block text-sm text-muted-foreground underline-offset-2 hover:text-foreground"
            >
                ← Back to tools
            </Link>
            <h1 className="mb-1 text-2xl font-bold text-foreground">{title}</h1>
            <p className="mb-6 text-muted-foreground">{description}</p>
        </>
    );
}
