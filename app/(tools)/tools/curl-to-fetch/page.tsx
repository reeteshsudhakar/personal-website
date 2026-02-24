"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { Button } from "@/components/ui/button";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { ToolCodeEditor } from "@/components/ToolCodeEditor/ToolCodeEditor";
import { ShareLinkButton } from "@/components/ShareLinkButton/ShareLinkButton";
import { downloadTextFile, useToolUrlState } from "@/lib/tools";

type ParsedCurl = {
    method: string;
    url: string;
    headers: Record<string, string>;
    data: string;
};

function tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = "";
    let quote: '"' | "'" | null = null;

    for (let i = 0; i < input.length; i += 1) {
        const char = input[i];

        if (char === "\\" && i + 1 < input.length) {
            current += input[i + 1];
            i += 1;
            continue;
        }

        if ((char === '"' || char === "'") && (!quote || quote === char)) {
            quote = quote ? null : (char as '"' | "'");
            continue;
        }

        if (!quote && /\s/.test(char)) {
            if (current) {
                tokens.push(current);
                current = "";
            }
            continue;
        }

        current += char;
    }

    if (current) tokens.push(current);
    return tokens;
}

function parseCurl(input: string): ParsedCurl {
    const tokens = tokenize(input.trim());
    if (tokens.length === 0) {
        throw new Error("Command is empty");
    }

    const start = tokens[0] === "curl" ? 1 : 0;
    let method = "GET";
    let url = "";
    let data = "";
    const headers: Record<string, string> = {};

    for (let i = start; i < tokens.length; i += 1) {
        const token = tokens[i];
        const next = tokens[i + 1];

        if ((token === "-X" || token === "--request") && next) {
            method = next.toUpperCase();
            i += 1;
            continue;
        }

        if ((token === "-H" || token === "--header") && next) {
            const idx = next.indexOf(":");
            if (idx > -1) {
                const key = next.slice(0, idx).trim();
                const value = next.slice(idx + 1).trim();
                headers[key] = value;
            }
            i += 1;
            continue;
        }

        if ((token === "-d" || token === "--data" || token === "--data-raw" || token === "--data-binary") && next) {
            data = data ? `${data}\n${next}` : next;
            i += 1;
            continue;
        }

        if (token === "--url" && next) {
            url = next;
            i += 1;
            continue;
        }

        if (!token.startsWith("-") && /^https?:\/\//.test(token)) {
            url = token;
        }
    }

    if (!url) {
        throw new Error("Could not find URL in cURL command");
    }

    if (data && method === "GET") {
        method = "POST";
    }

    return { method, url, headers, data };
}

function toFetchSnippet(parsed: ParsedCurl): string {
    const options: string[] = [`method: ${JSON.stringify(parsed.method)}`];

    if (Object.keys(parsed.headers).length > 0) {
        const headerEntries = Object.entries(parsed.headers)
            .map(([key, value]) => `    ${JSON.stringify(key)}: ${JSON.stringify(value)}`)
            .join(",\n");
        options.push(`headers: {\n${headerEntries}\n}`);
    }

    if (parsed.data) {
        options.push(`body: ${JSON.stringify(parsed.data)}`);
    }

    return [
        `const response = await fetch(${JSON.stringify(parsed.url)}, {`,
        `  ${options.join(",\n  ")}`,
        `});`,
        "",
        "const data = await response.text();",
        "console.log(data);",
    ].join("\n");
}

export default function CurlToFetchPage() {
    const defaultInput =
        "curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -d '{\"name\":\"Reetesh\"}'";
    const { state, setState, isQueryTooLarge } = useToolUrlState({
        defaults: { input: defaultInput },
        paramMap: { input: "i" },
    });
    const curlInput = state.input;
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const result = useMemo(() => {
        if (!curlInput.trim()) return { output: "", error: "" };

        try {
            const parsed = parseCurl(curlInput);
            return { output: toFetchSnippet(parsed), error: "" };
        } catch (error) {
            return {
                output: "",
                error: error instanceof Error ? error.message : "Conversion failed",
            };
        }
    }, [curlInput]);

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <ToolPageHeader title="Curl → fetch" description="Convert common cURL commands into fetch API snippets." />
            <p className="mb-4 text-sm text-muted-foreground">
                Supports common flags: <span className="font-mono">-X</span>, <span className="font-mono">-H</span>,{" "}
                <span className="font-mono">-d</span>, <span className="font-mono">--data-raw</span>, and{" "}
                <span className="font-mono">--url</span>.
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

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="curl-input" className="text-sm font-medium">
                            Input cURL
                        </Label>
                        <div className="h-9" aria-hidden />
                    </div>
                    <ToolCodeEditor
                        id="curl-input"
                        value={curlInput}
                        onChange={(value) => setState({ input: value })}
                        language="text"
                        height="320px"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="fetch-output" className="text-sm font-medium">
                            Output fetch snippet
                        </Label>
                        <div className="flex gap-2">
                            <CopyButton
                                text={result.output}
                                copyId="curl-to-fetch-output"
                                copiedId={copiedId}
                                onCopy={setCopiedId}
                                disabled={!result.output}
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!result.output}
                                onClick={() => downloadTextFile(result.output, "fetch-snippet.js")}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <ToolCodeEditor
                        id="fetch-output"
                        value={result.error || result.output}
                        language={result.error ? "text" : "javascript"}
                        readOnly
                        invalid={Boolean(result.error)}
                        height="320px"
                    />
                </div>
            </div>
        </div>
    );
}
