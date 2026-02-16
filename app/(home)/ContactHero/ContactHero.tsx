"use client";

import Link from "next/link";
import { FileText, Mail, Instagram } from "lucide-react";
import { useMediaQuery } from "@/lib/use-media-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactHero() {
    const isLargeScreen = useMediaQuery("(min-width: 48em)");

    return (
        <div
            className={cn(
                "relative flex w-full items-center justify-center bg-black bg-cover bg-center transition-opacity",
                isLargeScreen ? "h-screen" : "h-[calc(100vh-60px)]",
            )}
            style={{ backgroundImage: "url('/heros/contact-hero-background.png')" }}
        >
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
                <h2 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                    Let&apos;s get in touch!
                </h2>
                <p className="max-w-3xl px-6 py-8 text-center text-xl text-white">
                    Whether it&apos;s about technology, finance, music, or absolute nonsense, I&apos;m always up for a
                    chat. Feel free to reach out through any of the methods below!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 p-4">
                    <Link href="/contact" className="no-underline">
                        <Button
                            variant="default"
                            size="default"
                            className="gap-2 bg-teal-600 font-bold text-white hover:bg-teal-700"
                        >
                            <FileText className="size-4" />
                            Contact
                        </Button>
                    </Link>
                    <a href="mailto:reesud6187@gmail.com" className="no-underline">
                        <Button
                            variant="secondary"
                            size="default"
                            className="gap-2 bg-white/20 font-bold text-white hover:bg-white/30"
                        >
                            <Mail className="size-4" />
                            Email me!
                        </Button>
                    </a>
                    <a
                        href="https://instagram.com/reeteshsudhakar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                    >
                        <Button
                            variant="secondary"
                            size="default"
                            className="gap-2 bg-gradient-to-br from-pink-500 to-yellow-500 font-bold text-white hover:opacity-90"
                        >
                            <Instagram className="size-4" />
                            Instagram
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
