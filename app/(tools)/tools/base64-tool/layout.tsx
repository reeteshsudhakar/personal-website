import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Base64 Tool | Dev Tools",
    description: "Encode and decode Base64 and Base64URL strings.",
    openGraph: {
        title: "Base64 Tool | Dev Tools",
        description: "Encode and decode Base64 and Base64URL strings.",
        type: "website",
    },
};

export default function Base64ToolLayout({ children }: { children: React.ReactNode }) {
    return children;
}
