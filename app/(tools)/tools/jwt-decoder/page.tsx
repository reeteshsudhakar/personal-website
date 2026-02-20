"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { ToolCodeEditor } from "@/components/ToolCodeEditor/ToolCodeEditor";

function decodeBase64UrlToText(input: string): string {
    const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function formatEpoch(epoch: unknown): string | null {
    if (typeof epoch !== "number") return null;
    const date = new Date(epoch * 1000);
    if (Number.isNaN(date.getTime())) return null;
    return date.toISOString();
}

export default function JwtDecoderPage() {
    const [token, setToken] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const decoded = useMemo(() => {
        const value = token.trim();
        if (!value) {
            return { header: "", payload: "", signature: "", error: "" };
        }

        const parts = value.split(".");
        if (parts.length !== 3) {
            return {
                header: "",
                payload: "",
                signature: "",
                error: "JWT must have 3 dot-separated parts",
            };
        }

        try {
            const headerObj = JSON.parse(decodeBase64UrlToText(parts[0]));
            const payloadObj = JSON.parse(decodeBase64UrlToText(parts[1]));

            return {
                header: JSON.stringify(headerObj, null, 2),
                payload: JSON.stringify(payloadObj, null, 2),
                signature: parts[2],
                error: "",
            };
        } catch (error) {
            return {
                header: "",
                payload: "",
                signature: "",
                error: error instanceof Error ? error.message : "Failed to decode JWT",
            };
        }
    }, [token]);

    const payloadClaims = useMemo(() => {
        if (!decoded.payload) return { exp: null, iat: null, nbf: null };
        try {
            const payload = JSON.parse(decoded.payload) as Record<string, unknown>;
            return {
                exp: formatEpoch(payload.exp),
                iat: formatEpoch(payload.iat),
                nbf: formatEpoch(payload.nbf),
            };
        } catch {
            return { exp: null, iat: null, nbf: null };
        }
    }, [decoded.payload]);

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <ToolPageHeader title="JWT Decoder" description="Decode JWT header and payload locally in your browser." />
            <p className="mb-4 text-sm text-muted-foreground">
                This tool decodes tokens but does not verify signatures. Treat decoded claims as untrusted input.
            </p>

            <div className="mb-6 flex flex-col gap-2">
                <Label htmlFor="jwt-input" className="text-sm font-medium">
                    JWT
                </Label>
                <Input
                    id="jwt-input"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    placeholder="eyJhbGciOi..."
                    className="font-mono text-sm"
                />
                {decoded.error && <p className="text-sm text-destructive">{decoded.error}</p>}
            </div>

            {decoded.payload && !decoded.error && (
                <div className="mb-6 grid gap-2 rounded-md border border-border/50 bg-muted/20 p-4 text-sm">
                    <p>
                        <span className="font-medium">iat:</span> {payloadClaims.iat ?? "n/a"}
                    </p>
                    <p>
                        <span className="font-medium">nbf:</span> {payloadClaims.nbf ?? "n/a"}
                    </p>
                    <p>
                        <span className="font-medium">exp:</span> {payloadClaims.exp ?? "n/a"}
                    </p>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="jwt-header" className="text-sm font-medium">
                            Header
                        </Label>
                        <CopyButton
                            text={decoded.header}
                            copyId="jwt-header"
                            copiedId={copiedId}
                            onCopy={setCopiedId}
                            disabled={!decoded.header}
                        />
                    </div>
                    <ToolCodeEditor id="jwt-header" value={decoded.header} language="json" readOnly height="220px" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="jwt-payload" className="text-sm font-medium">
                            Payload
                        </Label>
                        <CopyButton
                            text={decoded.payload}
                            copyId="jwt-payload"
                            copiedId={copiedId}
                            onCopy={setCopiedId}
                            disabled={!decoded.payload}
                        />
                    </div>
                    <ToolCodeEditor id="jwt-payload" value={decoded.payload} language="json" readOnly height="220px" />
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
                <Label htmlFor="jwt-signature" className="text-sm font-medium">
                    Signature (raw)
                </Label>
                <ToolCodeEditor
                    id="jwt-signature"
                    value={decoded.signature}
                    language="text"
                    readOnly
                    invalid={Boolean(decoded.error)}
                    height="100px"
                />
            </div>
        </div>
    );
}
