import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JWT Decoder | Dev Tools",
    description: "Decode JWT header and payload locally and inspect common claim timestamps.",
    openGraph: {
        title: "JWT Decoder | Dev Tools",
        description: "Decode JWT header and payload locally and inspect common claim timestamps.",
        type: "website",
    },
};

export default function JwtDecoderLayout({ children }: { children: React.ReactNode }) {
    return children;
}
