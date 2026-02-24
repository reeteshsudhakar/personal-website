"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { downloadTextFile } from "@/lib/tools";

function makeUuid(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
        const rand = Math.floor(Math.random() * 16);
        const val = char === "x" ? rand : (rand & 0x3) | 0x8;
        return val.toString(16);
    });
}

export default function UuidGeneratorPage() {
    const [count, setCount] = useState("10");
    const [format, setFormat] = useState<"lower" | "upper">("lower");
    const [uuids, setUuids] = useState<string[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const safeCount = useMemo(() => {
        const parsed = Number.parseInt(count, 10);
        if (Number.isNaN(parsed)) return 1;
        return Math.min(100, Math.max(1, parsed));
    }, [count]);

    const output = uuids.join("\n");

    const handleGenerate = () => {
        const generated = Array.from({ length: safeCount }, () => makeUuid());
        setUuids(format === "upper" ? generated.map((item) => item.toUpperCase()) : generated);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <ToolPageHeader
                title="UUID Generator"
                description="Generate UUID v4 values for IDs, fixtures, and test data."
            />

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="uuid-count" className="text-sm font-medium">
                        Count (1-100)
                    </Label>
                    <Input
                        id="uuid-count"
                        value={count}
                        type="number"
                        min={1}
                        max={100}
                        onChange={(event) => setCount(event.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Case</Label>
                    <ToggleGroup
                        type="single"
                        value={format}
                        onValueChange={(value) => {
                            if (value) setFormat(value as "lower" | "upper");
                        }}
                        className="w-fit"
                    >
                        <ToggleGroupItem value="lower">lowercase</ToggleGroupItem>
                        <ToggleGroupItem value="upper">UPPERCASE</ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <Button onClick={handleGenerate}>Generate UUIDs</Button>
                <CopyButton
                    text={output}
                    copyId="uuid-output"
                    copiedId={copiedId}
                    onCopy={setCopiedId}
                    disabled={!output}
                />
                <Button variant="outline" onClick={() => downloadTextFile(output, "uuids.txt")} disabled={!output}>
                    Download
                </Button>
            </div>

            <Textarea
                value={output}
                readOnly
                placeholder="Generated UUIDs will appear here"
                className="min-h-[320px] font-mono text-sm"
            />
        </div>
    );
}
