export type Quote = {
    body: string;
    author: string;
    url: string;
    tags: string[];
};

const FAVQS_QOTD_URL = "https://favqs.com/api/qotd";

export async function getQuote(): Promise<Quote> {
    const response = await fetch(FAVQS_QOTD_URL);
    if (!response.ok) throw new Error("Quote API error");
    const data = await response.json();
    return {
        body: data.quote.body,
        author: data.quote.author,
        url: data.quote.url,
        tags: data.quote.tags ?? [],
    };
}
