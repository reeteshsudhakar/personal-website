"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { cn } from "@/lib/utils";

export default function UrlEncoderPage() {
    const [input, setInput] = useState("");
    const [isEncoding, setIsEncoding] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const output = isEncoding
        ? encodeURIComponent(input)
        : (() => {
              try {
                  return decodeURIComponent(input);
              } catch {
                  return "Invalid URL-encoded string";
              }
          })();

    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <Link
                href="/tools"
                className="mb-6 inline-block text-sm text-muted-foreground underline-offset-2 hover:text-foreground"
            >
                ← Back to tools
            </Link>
            <h1 className="mb-1 text-2xl font-bold text-foreground">URL Encoder & Decoder</h1>
            <p className="mb-6 text-muted-foreground">
                Encode strings to URL-safe format or decode URL-encoded strings back to normal text.
            </p>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Conversion Mode</Label>
                    <ToggleGroup
                        type="single"
                        value={isEncoding ? "encode" : "decode"}
                        onValueChange={(value) => {
                            if (value) setIsEncoding(value === "encode");
                        }}
                        className="w-fit"
                    >
                        <ToggleGroupItem value="encode" aria-label="Encode">
                            Encode
                        </ToggleGroupItem>
                        <ToggleGroupItem value="decode" aria-label="Decode">
                            Decode
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="input" className="text-sm font-medium">
                        {isEncoding ? "Input (normal text)" : "Input (URL-encoded)"}
                    </Label>
                    <Textarea
                        id="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            isEncoding
                                ? 'Enter text to encode, e.g., "Hello World!"'
                                : "Enter URL-encoded text, e.g., Hello%20World%21"
                        }
                        className="min-h-[120px] font-mono text-sm"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="output" className="text-sm font-medium">
                            {isEncoding ? "Output (URL-encoded)" : "Output (decoded text)"}
                        </Label>
                        <CopyButton
                            text={output}
                            copyId="output"
                            copiedId={copiedId}
                            onCopy={setCopiedId}
                            disabled={!output || output === "Invalid URL-encoded string"}
                        />
                    </div>
                    <Textarea
                        id="output"
                        value={output}
                        readOnly
                        className={cn(
                            "min-h-[120px] font-mono text-sm",
                            output === "Invalid URL-encoded string" && "border-destructive text-destructive",
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
