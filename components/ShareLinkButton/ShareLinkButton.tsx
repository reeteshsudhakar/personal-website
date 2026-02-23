"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const COPY_RESET_MS = 2000;

type ShareLinkButtonProps = {
    disabled?: boolean;
    title?: string;
    requireSensitiveConfirmation?: boolean;
    warningTitle?: string;
    warningDescription?: string;
};

export function ShareLinkButton({
    disabled = false,
    title,
    requireSensitiveConfirmation = false,
    warningTitle = "Sensitive Data Warning",
    warningDescription = "The generated link may contain sensitive information. Are you sure you want to continue?",
}: ShareLinkButtonProps) {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const copyLink = async () => {
        if (disabled || copied || typeof window === "undefined") return;
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), COPY_RESET_MS);
        } catch {
            // No-op: clipboard permissions can be denied in some contexts.
        }
    };

    const handleClick = async () => {
        if (disabled || copied) return;
        if (requireSensitiveConfirmation) {
            setOpen(true);
            return;
        }
        await copyLink();
    };

    const handleConfirmShare = async () => {
        await copyLink();
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={handleClick}
                disabled={disabled || copied}
                className="gap-2"
                title={title}
            >
                {copied ? (
                    <>
                        <Check className="size-4" />
                        Link Copied!
                    </>
                ) : (
                    <>
                        <Copy className="size-4" />
                        Share Link
                    </>
                )}
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{warningTitle}</AlertDialogTitle>
                        <AlertDialogDescription>{warningDescription}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmShare}>Copy Link</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
