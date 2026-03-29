"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TOOLS_LIST, getRecentToolIds } from "@/lib/tools";

const cardAccents = [
    "from-sky-500/18 via-cyan-500/8 to-transparent dark:from-sky-400/16 dark:via-sky-300/8",
    "from-emerald-500/18 via-teal-500/8 to-transparent dark:from-emerald-400/16 dark:via-teal-300/8",
    "from-blue-500/18 via-indigo-500/8 to-transparent dark:from-cyan-400/16 dark:via-blue-300/8",
    "from-lime-500/18 via-emerald-500/8 to-transparent dark:from-lime-400/16 dark:via-emerald-300/8",
];

function toolSlugLabel(href: string) {
    return href.replace("/tools/", "").replaceAll("-", " / ");
}

function ToolCard({
    title,
    description,
    href,
    accentIndex,
    featured = false,
}: {
    title: string;
    description: string;
    href: string;
    accentIndex: number;
    featured?: boolean;
}) {
    return (
        <Link href={href} className="group no-underline">
            <Card
                className={cn(
                    "surface-panel relative h-full overflow-hidden border-white/45 py-0 transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl dark:border-white/10",
                    featured && "border-primary/25",
                )}
            >
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-100",
                        cardAccents[accentIndex % cardAccents.length],
                    )}
                />
                <div className="absolute inset-0 surface-grid opacity-[0.14] dark:opacity-[0.08]" />
                <CardHeader className="relative gap-4 px-5 py-5">
                    <div className="flex items-center justify-between gap-4">
                        <span className="eyebrow text-foreground/65">{toolSlugLabel(href)}</span>
                        <ArrowRight className="size-4 text-foreground/45 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                            {title}
                        </CardTitle>
                        <CardDescription className="max-w-[34ch] text-sm leading-6 text-muted-foreground">
                            {description}
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
}

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
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(30,144,255,0.16),transparent_48%),radial-gradient(circle_at_top_right,rgba(44,196,147,0.18),transparent_28%)]" />
            <div className="pointer-events-none absolute inset-0 surface-grid opacity-[0.16] dark:opacity-[0.07]" />

            <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 md:px-6 md:py-12">
                <section className="surface-panel relative overflow-hidden rounded-[2rem] border border-white/55 p-6 sm:p-8 lg:p-10 dark:border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_30%),linear-gradient(135deg,rgba(1,114,175,0.08),transparent_44%,rgba(80,179,132,0.12))] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_24%),linear-gradient(135deg,rgba(56,189,248,0.12),transparent_42%,rgba(74,222,128,0.14))]" />
                    <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
                        <div className="max-w-3xl">
                            <h1 className="max-w-[11ch] text-balance text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
                                Dev tools.
                            </h1>
                            <p className="mt-4 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
                                Fast browser-based utilities for everyday engineering tasks.
                            </p>
                        </div>

                        <div className="surface-panel rounded-[1.75rem] border border-white/60 p-5 dark:border-white/10">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="eyebrow text-foreground/60">Quick Search</p>
                                    <p className="mt-2 font-display text-xl font-semibold text-foreground">
                                        Find a tool instantly
                                    </p>
                                </div>
                                <div className="hidden rounded-full border border-primary/20 bg-primary/10 p-3 text-primary sm:block">
                                    <Search className="size-5" />
                                </div>
                            </div>
                            <div className="mt-5 space-y-3">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search by tool name, use case, or keyword..."
                                        aria-label="Search tools"
                                        className="h-[52px] rounded-2xl border-white/70 bg-background/80 pl-11 text-[15px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-background/60"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {!hasSearchQuery && recentTools.length > 0 && (
                    <section className="space-y-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="eyebrow text-foreground/55">Continue Where You Left Off</p>
                                <h2 className="mt-1 text-2xl font-semibold text-foreground">Recently used</h2>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {recentTools.map((tool, index) => (
                                <ToolCard
                                    key={tool.id}
                                    title={tool.title}
                                    description={tool.description}
                                    href={tool.href}
                                    accentIndex={index}
                                    featured
                                />
                            ))}
                        </div>
                    </section>
                )}

                <section className="space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="eyebrow text-foreground/55">
                                {hasSearchQuery ? "Filtered Results" : "Full Collection"}
                            </p>
                            <h2 className="mt-1 text-2xl font-semibold text-foreground">
                                {hasSearchQuery ? `${filteredTools.length} matching tools` : "All tools"}
                            </h2>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {filteredTools.map((tool, index) => (
                            <ToolCard
                                key={tool.id}
                                title={tool.title}
                                description={tool.description}
                                href={tool.href}
                                accentIndex={index}
                            />
                        ))}
                    </div>

                    {filteredTools.length === 0 && (
                        <div className="surface-panel rounded-[1.75rem] border border-dashed border-border/80 px-6 py-10 text-center">
                            <p className="eyebrow text-foreground/55">No Match</p>
                            <p className="mt-2 text-lg font-medium text-foreground">No tools matched your search.</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try a broader keyword like `json`, `url`, or `decode`.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
