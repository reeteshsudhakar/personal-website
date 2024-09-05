import { Metadata } from "next";
import QuoteBlock from "@/components/QuoteBlock/QuoteBlock";

export const metadata: Metadata = {
    title: "Quotes | Reetesh Sudhakar",
    description: "A collection of quotes randomly pulled from the internet!",
};

export default function Page() {
    return (
        <>
            <QuoteBlock />
        </>
    );
}
