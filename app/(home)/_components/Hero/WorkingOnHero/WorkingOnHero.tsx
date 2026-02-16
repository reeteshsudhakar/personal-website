"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useMediaQuery } from "@/lib/use-media-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WorkingOnHero() {
    const isLargeScreen = useMediaQuery("(min-width: 48em)");

    return (
        <div
            className={cn(
                "relative flex w-full items-center justify-center bg-black bg-cover bg-center transition-opacity",
                isLargeScreen ? "h-screen" : "h-[calc(100vh-60px)]",
            )}
            style={{ backgroundImage: "url('/heros/working-on-background.png')" }}
        >
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
                <h2 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                    What am I working on?
                </h2>
                <p className="max-w-3xl px-6 py-8 text-center text-xl text-white">
                    Recently built a few websites, overhauled the AI course (CS 3600) curriculum and infrastructure at
                    Georgia Tech. I&apos;m maintaining this website, working on a second brain, and some basic dev tools
                    to self-host to simplify my life. I&apos;m also carving out time to write more. Stay tuned to see
                    the progress!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link href="/projects" className="no-underline">
                        <Button
                            variant="secondary"
                            size="default"
                            className="gap-2 bg-white/20 font-bold text-white hover:bg-white/30"
                        >
                            <Sparkles className="size-4" />
                            View my projects
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
