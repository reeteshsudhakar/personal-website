import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Timestamp Converter | Dev Tools | Reetesh Sudhakar",
    description:
        "Convert between epoch timestamps (seconds, milliseconds, microseconds, nanoseconds) and human-readable date/time in UTC and local timezone.",
    openGraph: {
        title: "Timestamp Converter | Dev Tools",
        description:
            "Convert between epoch timestamps and human-readable date/time. Supports multiple precision levels.",
        type: "website",
    },
};

export default function TimestampConverterLayout({ children }: { children: React.ReactNode }) {
    return children;
}
