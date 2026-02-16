import { Metadata } from "next";
import redirects from "@/redirects.json";

type RedirectsJson = Record<string, { href: string; title: string }>;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const redirectsTyped = redirects as RedirectsJson;
    const redirectData = redirectsTyped[slug];

    if (!redirectData) {
        return {
            title: "Redirect | Reetesh Sudhakar",
            description: "Redirecting...",
        };
    }

    return {
        title: `Redirect to ${redirectData.title} | Reetesh Sudhakar`,
        description: `Redirecting to ${redirectData.title}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
    return children;
}
