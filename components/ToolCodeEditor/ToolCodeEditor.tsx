"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { cn } from "@/lib/utils";

type ToolEditorLanguage = "json" | "yaml" | "javascript" | "typescript" | "text";

type ToolCodeEditorProps = {
    id: string;
    value: string;
    onChange?: (value: string) => void;
    language?: ToolEditorLanguage;
    readOnly?: boolean;
    height?: string;
    invalid?: boolean;
};

export function ToolCodeEditor({
    id,
    value,
    onChange,
    language = "text",
    readOnly = false,
    height = "320px",
    invalid = false,
}: ToolCodeEditorProps) {
    const { resolvedTheme } = useTheme();

    const extensions = useMemo(() => {
        if (language === "json") return [json()];
        if (language === "yaml") return [yaml()];
        if (language === "javascript") return [javascript()];
        if (language === "typescript") return [javascript({ typescript: true })];
        return [];
    }, [language]);

    return (
        <CodeMirror
            id={id}
            value={value}
            onChange={onChange}
            extensions={extensions}
            theme={resolvedTheme === "dark" ? oneDark : "light"}
            editable={!readOnly}
            className={cn(
                "overflow-hidden rounded-md border border-input text-sm",
                invalid && "border-destructive text-destructive",
            )}
            height={height}
            basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: !readOnly,
            }}
        />
    );
}
