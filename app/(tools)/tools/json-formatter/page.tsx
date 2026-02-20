"use client";

import { useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { cn } from "@/lib/utils";

function tryParseJson(str: string): { ok: true; value: unknown } | { ok: false; error: string; line?: number } {
    if (str.trim() === "") return { ok: true, value: null };
    try {
        const value = JSON.parse(str);
        return { ok: true, value };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Invalid JSON";
        let lineNumber: number | undefined;
        const lineMatch = errorMessage.match(/line (\d+)/i);
        if (lineMatch) {
            lineNumber = parseInt(lineMatch[1], 10);
        } else {
            const positionMatch = errorMessage.match(/position (\d+)/i);
            if (positionMatch) {
                const position = parseInt(positionMatch[1], 10);
                const lines = str.substring(0, Math.min(position, str.length)).split("\n");
                lineNumber = lines.length;
            } else {
                const columnMatch = errorMessage.match(/column (\d+)/i);
                if (columnMatch) {
                    const approximateLine = Math.ceil(str.length / 80);
                    if (approximateLine > 0) lineNumber = approximateLine;
                }
            }
        }

        return {
            ok: false,
            error: errorMessage,
            line: lineNumber,
        };
    }
}

type JsonMetrics = {
    lines: number;
    size: number;
    sizeFormatted: string;
    topLevelKeys: number;
    totalKeys: number;
    maxDepth: number;
    arrayCount: number;
    objectCount: number;
    stringCount: number;
    numberCount: number;
    booleanCount: number;
    nullCount: number;
};

function calculateMetrics(jsonStr: string, value: unknown): JsonMetrics {
    const lines = jsonStr === "" ? 0 : jsonStr.split("\n").length;
    const size = new TextEncoder().encode(jsonStr).length;
    const sizeFormatted =
        size < 1024
            ? `${size} B`
            : size < 1024 * 1024
            ? `${(size / 1024).toFixed(2)} KB`
            : `${(size / (1024 * 1024)).toFixed(2)} MB`;

    let topLevelKeys = 0;
    let totalKeys = 0;
    let maxDepth = 0;
    let arrayCount = 0;
    let objectCount = 0;
    let stringCount = 0;
    let numberCount = 0;
    let booleanCount = 0;
    let nullCount = 0;

    function traverse(obj: unknown, depth: number = 0): void {
        maxDepth = Math.max(maxDepth, depth);

        if (obj === null) {
            nullCount++;
            return;
        }

        if (Array.isArray(obj)) {
            arrayCount++;
            obj.forEach((item) => traverse(item, depth + 1));
            return;
        }

        if (typeof obj === "object") {
            objectCount++;
            const keys = Object.keys(obj);
            if (depth === 0) {
                topLevelKeys = keys.length;
            }
            totalKeys += keys.length;
            keys.forEach((key) => {
                traverse((obj as Record<string, unknown>)[key], depth + 1);
            });
            return;
        }

        switch (typeof obj) {
            case "string":
                stringCount++;
                break;
            case "number":
                numberCount++;
                break;
            case "boolean":
                booleanCount++;
                break;
        }
    }

    if (value !== null) {
        traverse(value);
    }

    return {
        lines,
        size,
        sizeFormatted,
        topLevelKeys,
        totalKeys,
        maxDepth,
        arrayCount,
        objectCount,
        stringCount,
        numberCount,
        booleanCount,
        nullCount,
    };
}

export default function JsonFormatterPage() {
    const [raw, setRaw] = useState("");
    const [showMetrics, setShowMetrics] = useState(false);
    const { resolvedTheme } = useTheme();
    const parsed = tryParseJson(raw);
    const isValid = parsed.ok;
    const metrics = isValid && parsed.ok ? calculateMetrics(raw, parsed.value) : null;

    const handleFormat = useCallback(() => {
        if (!parsed.ok) return;
        setRaw(JSON.stringify(parsed.value, null, 2));
    }, [parsed]);

    const handleFlatten = useCallback(() => {
        if (!parsed.ok) return;
        setRaw(JSON.stringify(parsed.value));
    }, [parsed]);

    const errorMessage = parsed.ok
        ? "Valid JSON"
        : parsed.line
        ? `Error at line ${parsed.line}: ${parsed.error}`
        : parsed.error;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <ToolPageHeader
                title="JSON Formatter & Validator"
                description="Paste JSON below. It validates as you type; use Format to pretty-print or Flatten to minify."
            />
            <div className="mb-6 flex items-center justify-end">
                {metrics && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMetrics(!showMetrics)}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        {showMetrics ? (
                            <>
                                <ChevronUp className="size-4" />
                                Hide Metrics
                            </>
                        ) : (
                            <>
                                <ChevronDown className="size-4" />
                                Show Metrics
                            </>
                        )}
                    </Button>
                )}
            </div>
            {metrics && showMetrics && (
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Lines</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.lines}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Size</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.sizeFormatted}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Top-level Keys</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.topLevelKeys}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Total Keys</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.totalKeys}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Max Depth</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.maxDepth}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Objects</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.objectCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Arrays</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.arrayCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Strings</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.stringCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Numbers</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.numberCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Booleans</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.booleanCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs">Nulls</CardDescription>
                            <CardTitle className="text-lg font-semibold text-[#0172AF] dark:text-[#50B384]">
                                {metrics.nullCount}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            )}
            {metrics && showMetrics && (
                <div className="mb-4 rounded-md border border-border/50 bg-muted/20 p-3 text-sm text-muted-foreground">
                    <p className="mb-2 font-medium text-foreground">About these metrics:</p>
                    <ul className="space-y-1 text-xs">
                        <li>
                            <strong>Size:</strong> Calculated using UTF-8 byte encoding.
                        </li>
                        <li>
                            <strong>Top-level Keys:</strong> Number of keys at the root level of the JSON object.
                        </li>
                        <li>
                            <strong>Total Keys:</strong> Count of all keys including nested objects (does not include
                            array indices).
                        </li>
                        <li>
                            <strong>Max Depth:</strong> Maximum nesting level (root level = 0, first nested level = 1,
                            etc.).
                        </li>
                    </ul>
                </div>
            )}
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={cn("text-sm font-medium", isValid ? "text-[#50B384]" : "text-destructive")}>
                        {errorMessage}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleFlatten}
                            disabled={!isValid || raw.trim() === ""}
                        >
                            Flatten
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleFormat}
                            disabled={!isValid || raw.trim() === ""}
                        >
                            Format
                        </Button>
                    </div>
                </div>
                <div
                    className={cn(
                        "overflow-hidden rounded-md",
                        isValid ? "border border-input" : "border border-destructive",
                    )}
                >
                    <CodeMirror
                        value={raw}
                        onChange={setRaw}
                        height="600px"
                        minHeight="280px"
                        extensions={[json()]}
                        theme={resolvedTheme === "dark" ? oneDark : undefined}
                        placeholder='{"example": "paste JSON here"}'
                        basicSetup={{
                            lineNumbers: true,
                            foldGutter: true,
                            dropCursor: false,
                            allowMultipleSelections: false,
                        }}
                        className={cn(
                            "text-sm",
                            !isValid &&
                                "[&_.cm-focused]:outline-destructive [&_.cm-focused]:ring-2 [&_.cm-focused]:ring-destructive/20",
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
