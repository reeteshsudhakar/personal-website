import { Metadata } from "next";
import { getQuote } from "@/lib/quotes";
import QuoteBlock from "@/components/QuoteBlock/QuoteBlock";

export const metadata: Metadata = {
    title: "Quotes | Reetesh Sudhakar",
    description: "A collection of inspirational quotes randomly pulled from the internet.",
    openGraph: {
        title: "Quotes | Reetesh Sudhakar",
        description: "A collection of inspirational quotes randomly pulled from the internet.",
        type: "website",
    },
};

export default async function Page() {
    let initialQuote = null;
    try {
        initialQuote = await getQuote();
    } catch {
        // Error surfaced in QuoteBlock UI
    }
    return <QuoteBlock initialQuote={initialQuote} />;
}
