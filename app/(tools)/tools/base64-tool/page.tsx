"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { cn } from "@/lib/utils";

type Mode = "encode" | "decode";
type Variant = "base64" | "base64url";

function bytesToBase64(bytes: Uint8Array): string {
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
    const binary = atob(value);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function toBase64Url(value: string): string {
    return value.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    return normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
}

export default function Base64ToolPage() {
    const [mode, setMode] = useState<Mode>("encode");
    const [variant, setVariant] = useState<Variant>("base64");
    const [input, setInput] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const result = useMemo(() => {
        if (!input.trim()) return { output: "", error: "" };

        try {
            if (mode === "encode") {
                const bytes = new TextEncoder().encode(input);
                const base64 = bytesToBase64(bytes);
                return {
                    output: variant === "base64url" ? toBase64Url(base64) : base64,
                    error: "",
                };
            }

            const normalized = variant === "base64url" ? fromBase64Url(input) : input;
            const bytes = base64ToBytes(normalized);
            return {
                output: new TextDecoder().decode(bytes),
                error: "",
            };
        } catch (error) {
            return {
                output: "",
                error: error instanceof Error ? error.message : "Invalid Base64 input",
            };
        }
    }, [input, mode, variant]);

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <ToolPageHeader title="Base64 Tool" description="Encode or decode Base64 and Base64URL strings." />
            <p className="mb-4 text-sm text-muted-foreground">
                Use <span className="font-mono">Base64URL</span> for JWT parts and URL-safe payloads.
            </p>

            <div className="mb-6 flex flex-wrap gap-6">
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Mode</Label>
                    <ToggleGroup
                        type="single"
                        value={mode}
                        onValueChange={(value) => {
                            if (value) setMode(value as Mode);
                        }}
                        className="w-fit"
                    >
                        <ToggleGroupItem value="encode">Encode</ToggleGroupItem>
                        <ToggleGroupItem value="decode">Decode</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Variant</Label>
                    <ToggleGroup
                        type="single"
                        value={variant}
                        onValueChange={(value) => {
                            if (value) setVariant(value as Variant);
                        }}
                        className="w-fit"
                    >
                        <ToggleGroupItem value="base64">Base64</ToggleGroupItem>
                        <ToggleGroupItem value="base64url">Base64URL</ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="base64-input" className="text-sm font-medium">
                            {mode === "encode" ? "Input Text" : "Input Base64"}
                        </Label>
                        <div className="h-9" aria-hidden />
                    </div>
                    <Textarea
                        id="base64-input"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        className="min-h-[320px] font-mono text-sm"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="base64-output" className="text-sm font-medium">
                            Output
                        </Label>
                        <CopyButton
                            text={result.output}
                            copyId="base64-output"
                            copiedId={copiedId}
                            onCopy={setCopiedId}
                            disabled={!result.output}
                        />
                    </div>
                    <Textarea
                        id="base64-output"
                        value={result.error || result.output}
                        readOnly
                        className={cn(
                            "min-h-[320px] font-mono text-sm",
                            result.error && "border-destructive text-destructive",
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
