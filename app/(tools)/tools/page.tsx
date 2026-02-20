import { Metadata } from "next";
import { ToolsIndexClient } from "@/components/ToolsIndexClient/ToolsIndexClient";

export const metadata: Metadata = {
    title: "Dev Tools",
    description: "A collection of handy developer tools.",
    openGraph: {
        title: "Dev Tools | Reetesh Sudhakar",
        description: "A collection of handy developer tools.",
        type: "website",
    },
};

export default function ToolsPage() {
    return <ToolsIndexClient />;
}
