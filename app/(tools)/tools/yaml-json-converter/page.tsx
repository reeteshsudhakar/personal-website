"use client";

import { useMemo, useState } from "react";
import YAML from "yaml";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CopyButton } from "@/components/CopyButton/CopyButton";
import { Button } from "@/components/ui/button";
import { ToolPageHeader } from "@/components/ToolPageHeader/ToolPageHeader";
import { ToolCodeEditor } from "@/components/ToolCodeEditor/ToolCodeEditor";
import { ShareLinkButton } from "@/components/ShareLinkButton/ShareLinkButton";
import { downloadTextFile, useToolUrlState } from "@/lib/tools";

type Mode = "yaml-to-json" | "json-to-yaml";

const SAMPLE_INPUTS: Record<Mode, string> = {
    "yaml-to-json": "name: reetesh\nstack:\n  - nextjs\n  - typescript",
    "json-to-yaml": '{\n  "name": "reetesh",\n  "stack": ["nextjs", "typescript"]\n}',
};

export default function YamlJsonConverterPage() {
    const { state, setState, isQueryTooLarge } = useToolUrlState({
        defaults: { mode: "yaml-to-json", input: SAMPLE_INPUTS["yaml-to-json"] },
        paramMap: { mode: "m", input: "i" },
    });
    const mode = state.mode === "json-to-yaml" ? "json-to-yaml" : "yaml-to-json";
    const input = state.input;
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const result = useMemo(() => {
        if (!input.trim()) {
            return { output: "", error: "" };
        }

        try {
            if (mode === "yaml-to-json") {
                const parsed = YAML.parse(input);
                return { output: JSON.stringify(parsed, null, 2), error: "" };
            }

            const parsed = JSON.parse(input);
            return { output: YAML.stringify(parsed), error: "" };
        } catch (error) {
            return {
                output: "",
                error: error instanceof Error ? error.message : "Conversion failed",
            };
        }
    }, [input, mode]);

    const outputFileName = mode === "yaml-to-json" ? "converted.json" : "converted.yaml";
    const inputLanguage = mode === "yaml-to-json" ? "yaml" : "json";
    const outputLanguage = result.error ? "text" : mode === "yaml-to-json" ? "json" : "yaml";

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <ToolPageHeader title="YAML ↔ JSON" description="Convert between YAML and JSON with live validation." />
            <p className="mb-4 text-sm text-muted-foreground">
                Multi-document YAML and unsupported tags may not map cleanly to JSON.
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

            <div className="mb-6 flex flex-col gap-2">
                <Label className="text-sm font-medium">Conversion Mode</Label>
                <ToggleGroup
                    type="single"
                    value={mode}
                    onValueChange={(value) => {
                        if (!value) return;
                        const nextMode = value as Mode;
                        setState({
                            mode: nextMode,
                            input: SAMPLE_INPUTS[nextMode],
                        });
                    }}
                    className="w-fit"
                >
                    <ToggleGroupItem value="yaml-to-json">YAML -&gt; JSON</ToggleGroupItem>
                    <ToggleGroupItem value="json-to-yaml">JSON -&gt; YAML</ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="yaml-json-input" className="text-sm font-medium">
                            {mode === "yaml-to-json" ? "Input (YAML)" : "Input (JSON)"}
                        </Label>
                        <div className="h-9" aria-hidden />
                    </div>
                    <ToolCodeEditor
                        id="yaml-json-input"
                        value={input}
                        onChange={(value) => setState((prev) => ({ ...prev, input: value }))}
                        language={inputLanguage}
                        height="360px"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex h-9 items-center justify-between gap-2">
                        <Label htmlFor="yaml-json-output" className="text-sm font-medium">
                            {mode === "yaml-to-json" ? "Output (JSON)" : "Output (YAML)"}
                        </Label>
                        <div className="flex gap-2">
                            <CopyButton
                                text={result.output}
                                copyId="yaml-json-output"
                                copiedId={copiedId}
                                onCopy={setCopiedId}
                                disabled={!result.output}
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!result.output}
                                onClick={() => downloadTextFile(result.output, outputFileName)}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <ToolCodeEditor
                        id="yaml-json-output"
                        value={result.error || result.output}
                        language={outputLanguage}
                        readOnly
                        invalid={Boolean(result.error)}
                        height="360px"
                    />
                </div>
            </div>
        </div>
    );
}
