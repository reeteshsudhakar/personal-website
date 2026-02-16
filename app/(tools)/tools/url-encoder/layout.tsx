import { Metadata } from "next";

export const metadata: Metadata = {
    title: "URL Encoder & Decoder | Dev Tools",
    description: "Encode strings to URL-safe format or decode URL-encoded strings.",
    openGraph: {
        title: "URL Encoder & Decoder | Dev Tools",
        description: "Encode strings to URL-safe format or decode URL-encoded strings.",
        type: "website",
    },
};

export default function UrlEncoderLayout({ children }: { children: React.ReactNode }) {
    return children;
}
