import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Regex Tester | Dev Tools",
    description: "Test regex patterns against text and inspect matches and capture groups.",
    openGraph: {
        title: "Regex Tester | Dev Tools",
        description: "Test regex patterns against text and inspect matches and capture groups.",
        type: "website",
    },
};

export default function RegexTesterLayout({ children }: { children: React.ReactNode }) {
    return children;
}
