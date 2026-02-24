"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOOLS_LIST, getRecentToolIds } from "@/lib/tools";

export function ToolsIndexClient() {
    const [query, setQuery] = useState("");
    const [recentToolIds, setRecentToolIds] = useState<string[]>([]);

    useEffect(() => {
        setRecentToolIds(getRecentToolIds());
    }, []);

    const recentTools = useMemo(
        () =>
            recentToolIds
                .map((id) => TOOLS_LIST.find((tool) => tool.id === id))
                .filter((tool): tool is (typeof TOOLS_LIST)[number] => Boolean(tool)),
        [recentToolIds],
    );

    const filteredTools = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return TOOLS_LIST;

        return TOOLS_LIST.filter((tool) =>
            [tool.title, tool.description, tool.id, tool.href].join(" ").toLowerCase().includes(normalizedQuery),
        );
    }, [query]);
    const hasSearchQuery = query.trim().length > 0;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <h1 className="mb-2 text-center text-3xl font-bold text-foreground">Dev Tools</h1>
            <p className="mb-10 text-center text-muted-foreground">Random tools I use. Stay tuned for more!</p>
            <div className="mx-auto mb-8 max-w-xl">
                <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search and filter tools by name or keyword(s)..."
                    aria-label="Search tools"
                />
            </div>
            {!hasSearchQuery && recentTools.length > 0 && (
                <>
                    <h2 className="mb-3 text-lg font-semibold text-foreground">Recently Used</h2>
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {recentTools.map((tool) => (
                            <Link key={tool.id} href={tool.href} className="no-underline">
                                <Card className="h-full border-[#0172AF]/30 transition-colors hover:bg-accent/50 dark:border-[#50B384]/30">
                                    <CardHeader>
                                        <CardTitle className="text-[#0172AF] dark:text-[#50B384]">
                                            {tool.title}
                                        </CardTitle>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </>
            )}
            <h2 className="mb-3 text-lg font-semibold text-foreground">All Tools</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {filteredTools.map((tool) => (
                    <Link key={tool.id} href={tool.href} className="no-underline">
                        <Card className="h-full transition-colors hover:bg-accent/50">
                            <CardHeader>
                                <CardTitle className="text-[#0172AF] dark:text-[#50B384]">{tool.title}</CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
            {filteredTools.length === 0 && (
                <p className="mt-6 text-center text-sm text-muted-foreground">No tools matched your search.</p>
            )}
        </div>
    );
}
