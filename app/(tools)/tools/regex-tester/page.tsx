"use client";

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { ShareLinkButton } from "@/components/ShareLinkButton/ShareLinkButton";
import { useToolUrlState } from "@/lib/tools";

type MatchView = {
    index: number;
    text: string;
    groups: string[];
};

export default function RegexTesterPage() {
    const { state, setState, isQueryTooLarge } = useToolUrlState({
        defaults: {
            pattern: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b",
            flags: "g",
            testText: "const user_id = 42;\nconst isActive = true;",
        },
        paramMap: { pattern: "p", flags: "f", testText: "t" },
    });
    const { pattern, flags, testText } = state;

    const result = useMemo(() => {
        if (!pattern) return { error: "", matches: [] as MatchView[] };

        try {
            const regex = new RegExp(pattern, flags);
            const hasGlobal = flags.includes("g");

            if (!hasGlobal) {
                const match = regex.exec(testText);
                if (!match) return { error: "", matches: [] };
                return {
                    error: "",
                    matches: [
                        {
                            index: match.index,
                            text: match[0],
                            groups: match.slice(1),
                        },
                    ],
                };
            }

            const matches = Array.from(testText.matchAll(regex), (match) => ({
                index: match.index ?? -1,
                text: match[0],
                groups: match.slice(1),
            }));

            return { error: "", matches };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : "Invalid regex",
                matches: [] as MatchView[],
            };
        }
    }, [pattern, flags, testText]);

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <ToolPageHeader
                title="Regex Tester"
                description="Test regex patterns with live match previews and capture groups."
            />
            <p className="mb-4 text-sm text-muted-foreground">
                Enter a pattern and flags (like <span className="font-mono">gim</span>), then paste test text. With{" "}
                <span className="font-mono">g</span>, it shows all matches; without it, only the first match.
            </p>
            <div className="mb-4 flex justify-end">
                <ShareLinkButton
                    disabled={isQueryTooLarge}
                    requireSensitiveConfirmation
                    title={
                        isQueryTooLarge
                            ? "Input is too large to include in the URL. Reduce input size to share."
                            : "Copy a link with the current tool state"
                    }
                />
            </div>
            {isQueryTooLarge && (
                <p className="mb-4 text-sm text-amber-600 dark:text-amber-500">
                    Input is too large for URL sharing. The link keeps the last smaller state.
                </p>
            )}

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="regex-pattern" className="text-sm font-medium">
                        Pattern
                    </Label>
                    <Input
                        id="regex-pattern"
                        value={pattern}
                        onChange={(event) => setState((prev) => ({ ...prev, pattern: event.target.value }))}
                        placeholder="\\w+"
                        className="font-mono text-sm"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="regex-flags" className="text-sm font-medium">
                        Flags
                    </Label>
                    <Input
                        id="regex-flags"
                        value={flags}
                        onChange={(event) => setState((prev) => ({ ...prev, flags: event.target.value }))}
                        placeholder="gim"
                        className="font-mono text-sm"
                    />
                </div>
            </div>

            <div className="mb-6 flex flex-col gap-2">
                <Label htmlFor="regex-test-text" className="text-sm font-medium">
                    Test Text
                </Label>
                <Textarea
                    id="regex-test-text"
                    value={testText}
                    onChange={(event) => setState((prev) => ({ ...prev, testText: event.target.value }))}
                    className="min-h-[220px] font-mono text-sm"
                />
            </div>

            {result.error ? (
                <p className="text-sm text-destructive">{result.error}</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Matches ({result.matches.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {result.matches.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No matches found.</p>
                        ) : (
                            result.matches.map((match, index) => (
                                <div key={`${match.index}-${index}`} className="rounded-md border border-border/50 p-3">
                                    <p className="font-mono text-sm">
                                        <span className="text-muted-foreground">
                                            [{index}] @ {match.index}:
                                        </span>{" "}
                                        {JSON.stringify(match.text)}
                                    </p>
                                    {match.groups.length > 0 && (
                                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                                            groups: {JSON.stringify(match.groups)}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
