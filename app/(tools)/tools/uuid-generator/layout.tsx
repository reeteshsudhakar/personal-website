import { Metadata } from "next";

export const metadata: Metadata = {
    title: "UUID Generator | Dev Tools",
    description: "Generate UUID v4 values and copy or download them.",
    openGraph: {
        title: "UUID Generator | Dev Tools",
        description: "Generate UUID v4 values and copy or download them.",
        type: "website",
    },
};

export default function UuidGeneratorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
