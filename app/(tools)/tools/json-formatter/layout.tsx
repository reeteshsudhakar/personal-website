import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Formatter & Validator | Dev Tools",
    description:
        "Validate, format, analyze, and visualize JSON with syntax highlighting, structure metrics, and an interactive graph view.",
    openGraph: {
        title: "JSON Formatter & Validator | Dev Tools",
        description: "Validate, format, analyze, and visualize JSON with an interactive structure graph.",
        type: "website",
    },
};

export default function JsonFormatterLayout({ children }: { children: React.ReactNode }) {
    return children;
}
