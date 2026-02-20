import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Curl → fetch | Dev Tools",
    description: "Convert common cURL commands into fetch API snippets.",
    openGraph: {
        title: "Curl → fetch | Dev Tools",
        description: "Convert common cURL commands into fetch API snippets.",
        type: "website",
    },
};

export default function CurlToFetchLayout({ children }: { children: React.ReactNode }) {
    return children;
}
