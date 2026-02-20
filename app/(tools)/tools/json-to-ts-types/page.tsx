"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { Button } from "@/components/ui/button";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { ToolCodeEditor } from "@/components/ToolCodeEditor/ToolCodeEditor";
import { downloadTextFile } from "@/lib/download-text-file";

function isIdentifier(value: string): boolean {
    return /^[$A-Z_a-z][$\w]*$/.test(value);
}

function formatKey(key: string): string {
    return isIdentifier(key) ? key : JSON.stringify(key);
}

function normalizeTypeName(name: string): string {
    const cleaned = name.trim().replace(/[^A-Za-z0-9_$]/g, "");
    if (!cleaned) return "RootObject";
    return /^[A-Za-z_$]/.test(cleaned) ? cleaned : `T${cleaned}`;
}

function inferObjectFields(value: Record<string, unknown>, depth: number): string {
    const indent = "    ".repeat(depth + 1);
    return Object.entries(value)
        .map(([key, nested]) => `${indent}${formatKey(key)}: ${inferType(nested, depth + 1)};`)
        .join("\n");
}

function inferType(value: unknown, depth: number): string {
    if (value === null) return "null";
    if (Array.isArray(value)) {
        if (value.length === 0) return "unknown[]";
        const uniqueTypes = Array.from(new Set(value.map((item) => inferType(item, depth + 1))));
        return uniqueTypes.length === 1 ? `${uniqueTypes[0]}[]` : `(${uniqueTypes.join(" | ")})[]`;
    }

    if (typeof value === "object") {
        const objectValue = value as Record<string, unknown>;
        const entries = Object.entries(objectValue);
        if (entries.length === 0) return "{}";
        const baseIndent = "    ".repeat(depth);
        return `{\n${inferObjectFields(objectValue, depth)}\n${baseIndent}}`;
    }

    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";

    return "unknown";
}

function generateTsTypes(value: unknown, rootTypeName: string): string {
    const typeName = normalizeTypeName(rootTypeName);

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        const objectValue = value as Record<string, unknown>;
        if (Object.keys(objectValue).length === 0) {
            return `export type ${typeName} = Record<string, never>;`;
        }
        return `export interface ${typeName} {\n${inferObjectFields(objectValue, 0)}\n}`;
    }

    return `export type ${typeName} = ${inferType(value, 0)};`;
}

export default function JsonToTsTypesPage() {
    const [jsonInput, setJsonInput] = useState('{\n  "id": 1,\n  "name": "Reetesh",\n  "isActive": true\n}');
    const [rootTypeName, setRootTypeName] = useState("RootObject");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const result = useMemo(() => {
        if (!jsonInput.trim()) return { output: "", error: "" };

        try {
            const parsed = JSON.parse(jsonInput);
            return {
                output: generateTsTypes(parsed, rootTypeName),
                error: "",
            };
        } catch (error) {
            return {
                output: "",
                error: error instanceof Error ? error.message : "Invalid JSON",
            };
        }
    }, [jsonInput, rootTypeName]);

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <ToolPageHeader title="JSON → TS Types" description="Generate TypeScript types from JSON payloads." />
            <p className="mb-4 text-sm text-muted-foreground">
                This infers types from the current sample shape; optional fields require representative examples.
            </p>

            <div className="mb-6 flex max-w-sm flex-col gap-2">
                <Label htmlFor="root-type-name" className="text-sm font-medium">
                    Root Type Name
                </Label>
                <Input
                    id="root-type-name"
                    value={rootTypeName}
                    onChange={(event) => setRootTypeName(event.target.value)}
                    placeholder="RootObject"
                    className="font-mono text-sm"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="json-to-ts-input" className="text-sm font-medium">
                            Input JSON
                        </Label>
                        <div className="h-9" aria-hidden />
                    </div>
                    <ToolCodeEditor
                        id="json-to-ts-input"
                        value={jsonInput}
                        onChange={setJsonInput}
                        language="json"
                        height="360px"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="json-to-ts-output" className="text-sm font-medium">
                            Generated TypeScript
                        </Label>
                        <div className="flex gap-2">
                            <CopyButton
                                text={result.output}
                                copyId="json-to-ts-output"
                                copiedId={copiedId}
                                onCopy={setCopiedId}
                                disabled={!result.output}
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!result.output}
                                onClick={() => downloadTextFile(result.output, "types.ts")}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <ToolCodeEditor
                        id="json-to-ts-output"
                        value={result.error || result.output}
                        language={result.error ? "text" : "typescript"}
                        readOnly
                        invalid={Boolean(result.error)}
                        height="360px"
                    />
                </div>
            </div>
        </div>
    );
}
