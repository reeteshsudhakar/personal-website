"use client";

import { useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const COPY_RESET_MS = 2000;

type CopyButtonProps = {
    text: string;
    copyId: string;
    copiedId: string | null;
    onCopy: (id: string) => void;
    label?: string;
    variantLabel?: string;
    disabled?: boolean;
    title?: string;
};

export function CopyButton({
    text,
    copyId,
    copiedId,
    onCopy,
    label = "Copy",
    variantLabel,
    disabled = false,
    title,
}: CopyButtonProps) {
    const isCopied = copiedId === copyId;

    const handleClick = useCallback(() => {
        if (isCopied || disabled || !text) return;
        navigator.clipboard.writeText(text);
        onCopy(copyId);
        setTimeout(() => onCopy(""), COPY_RESET_MS);
    }, [text, copyId, isCopied, disabled, onCopy]);

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={disabled || !text || isCopied}
            className="gap-2"
            title={title}
        >
            {isCopied ? (
                <>
                    <Check className="size-4" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="size-4" />
                    {variantLabel ?? label}
                </>
            )}
        </Button>
    );
}
