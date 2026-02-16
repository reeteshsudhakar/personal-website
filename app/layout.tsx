import "@/app/globals.css";
import React from "react";
import { ThemeProvider } from "next-themes";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Metadata } from "next";

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <TooltipProvider>
                        <AppWrapper>{children}</AppWrapper>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
