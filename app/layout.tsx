import "@/app/globals.css";
import React from "react";
import { IBM_Plex_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Metadata, Viewport } from "next";

const bodyFont = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-body",
});

const displayFont = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-display",
});

const monoFont = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.reeteshsudhakar.com"),
    title: {
        default: "Reetesh Sudhakar - Software Developer",
        template: "%s | Reetesh Sudhakar",
    },
    description:
        "Software Engineer at Chicago Trading Company and recent Georgia Tech graduate. Passionate about finance, technology, music, and most importantly, dogs.",
    keywords: ["Reetesh Sudhakar", "Software Developer", "Georgia Tech", "Computer Science", "Portfolio"],
    authors: [{ name: "Reetesh Sudhakar" }],
    creator: "Reetesh Sudhakar",
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Reetesh Sudhakar",
        title: "Reetesh Sudhakar - Software Developer",
        description:
            "Software Engineer at Chicago Trading Company and recent Georgia Tech graduate. Passionate about finance, technology, music, and most importantly, dogs.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Reetesh Sudhakar - Software Developer",
        description:
            "Software Engineer at Chicago Trading Company and recent Georgia Tech graduate. Passionate about finance, technology, music, and most importantly, dogs.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <TooltipProvider>
                        <AppWrapper>{children}</AppWrapper>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
