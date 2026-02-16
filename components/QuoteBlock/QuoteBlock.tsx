"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getNewQuote } from "@/app/quote/actions";
import type { Quote } from "@/lib/quotes";

type QuoteBlockProps = {
    initialQuote: Quote | null;
};

const QuoteComponent = ({ initialQuote }: QuoteBlockProps) => {
    const [quote, setQuote] = useState<Quote | null>(initialQuote);
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(async () => {
            const nextQuote = await getNewQuote();
            if (nextQuote) setQuote(nextQuote);
        });
    };

    if (!quote) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-foreground">Failed to load the quote.</p>
                <Button variant="outline" onClick={handleRefresh} disabled={isPending}>
                    {isPending ? <Spinner className="size-5" /> : "Try again"}
                </Button>
            </div>
        );
    }

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isPending}
                className="fixed top-4 right-4 z-10 text-white hover:bg-white/10"
                aria-label="Fetch new quote"
            >
                {isPending ? <Spinner className="size-5" /> : <RefreshCw className="size-5" />}
            </Button>
            <div className="flex min-h-screen items-center justify-center px-4 text-center">
                <div className="mx-auto max-w-2xl">
                    {isPending && quote ? (
                        <div className="flex items-center justify-center py-12">
                            <Spinner className="size-10 text-primary" />
                        </div>
                    ) : quote ? (
                        <>
                            <h1 className="mb-4 text-2xl font-semibold text-white">{quote.body}</h1>
                            <p className="mb-4 font-bold text-foreground">{quote.author}</p>

                            {quote.tags.length > 0 && (
                                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                                    {quote.tags.map((tag, index) => (
                                        <Badge key={index} className="bg-[#50B384]">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={quote.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline underline-offset-2 hover:opacity-90"
                            >
                                View Source
                            </Link>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default QuoteComponent;
