"use server";

import { getQuote } from "@/lib/quotes";
import type { Quote } from "@/lib/quotes";

export async function getNewQuote(): Promise<Quote | null> {
    try {
        return await getQuote();
    } catch {
        return null;
    }
}
