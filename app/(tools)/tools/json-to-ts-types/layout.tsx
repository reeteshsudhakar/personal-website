import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON → TS Types | Dev Tools",
    description: "Generate TypeScript interfaces and types from JSON payloads.",
    openGraph: {
        title: "JSON → TS Types | Dev Tools",
        description: "Generate TypeScript interfaces and types from JSON payloads.",
        type: "website",
    },
};

export default function JsonToTsTypesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
