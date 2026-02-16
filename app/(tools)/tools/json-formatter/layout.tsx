import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Formatter & Validator | Dev Tools | Reetesh Sudhakar",
    description:
        "Validate, format, and analyze JSON with syntax highlighting, real-time validation, and detailed metrics. Includes formatter, validator, and minifier.",
    openGraph: {
        title: "JSON Formatter & Validator | Dev Tools",
        description:
            "Validate, format, and analyze JSON with syntax highlighting, real-time validation, and detailed metrics.",
        type: "website",
    },
};

export default function JsonFormatterLayout({ children }: { children: React.ReactNode }) {
    return children;
}
