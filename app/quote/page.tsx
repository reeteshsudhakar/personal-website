import { Metadata } from "next";
import { getQuote } from "@/lib/quotes";
import QuoteBlock from "@/components/QuoteBlock/QuoteBlock";

export const metadata: Metadata = {
    title: "Quotes | Reetesh Sudhakar",
    description: "A collection of quotes randomly pulled from the internet!",
};

export default async function Page() {
    let initialQuote = null;
    try {
        initialQuote = await getQuote();
    } catch {
        // QuoteBlock will show error state when user tries to load/refresh
    }
    return <QuoteBlock initialQuote={initialQuote} />;
}
