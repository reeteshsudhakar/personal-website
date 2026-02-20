import { Metadata } from "next";

export const metadata: Metadata = {
    title: "YAML ↔ JSON | Dev Tools",
    description: "Convert YAML to JSON and JSON to YAML with live validation.",
    openGraph: {
        title: "YAML ↔ JSON | Dev Tools",
        description: "Convert YAML to JSON and JSON to YAML with live validation.",
        type: "website",
    },
};

export default function YamlJsonConverterLayout({ children }: { children: React.ReactNode }) {
    return children;
}
