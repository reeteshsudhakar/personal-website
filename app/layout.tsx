import "@/app/globals.css";
import React from "react";
import { ThemeProvider } from "next-themes";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reetesh Sudhakar",
    description: "My personal portfolio page!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <TooltipProvider>
                        <AppWrapper>{children}</AppWrapper>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
