"use client";

import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

export function IntroHero() {
    const isLargeScreen = useMediaQuery("(min-width: 48em)");

    return (
        <div
            className={cn(
                "relative flex w-full items-center justify-center bg-black bg-cover bg-center transition-opacity",
                isLargeScreen ? "h-screen" : "h-[calc(100vh-60px)]",
            )}
            style={{
                backgroundImage: isLargeScreen
                    ? "url('/heros/intro-hero-background.jpg')"
                    : "url('/heros/intro-hero-background-small.jpg')",
            }}
        >
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-6">
                <h2 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                    Hi! I&apos;m Reetesh.
                </h2>
                <p className="px-4 py-2 text-center text-xl text-white">
                    I&apos;m a recent Computer Science graduate from Georgia Tech! I&apos;m passionate about finance,
                    technology, and music (and most importantly, I love dogs 🐶). Scroll to learn more ⬇️
                </p>
            </div>
        </div>
    );
}
