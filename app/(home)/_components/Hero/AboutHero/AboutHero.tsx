"use client";

import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

export function AboutHero() {
    const isLargeScreen = useMediaQuery("(min-width: 48em)");

    return (
        <div
            className={cn(
                "relative flex w-full items-center justify-center bg-black bg-cover bg-center transition-opacity",
                isLargeScreen ? "h-screen" : "h-[calc(100vh-60px)]",
            )}
            style={{ backgroundImage: "url('/heros/about-background.png')" }}
        >
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
                <h2 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                    A Little Bit About Me
                </h2>
                <p className="max-w-3xl px-6 py-8 text-center text-xl text-white">
                    I recently completed my B.S. and M.S. in Computer Science at Georgia Tech. I&apos;m a Software
                    Engineer at <span className="font-bold text-[#b08fcb]">Chicago Trading Company.</span> I&apos;m into
                    full-stack development, and I love working with data. I&apos;m also a huge fan of music - I&apos;ve
                    done choir, a cappella, and Carnatic music!
                </p>
            </div>
        </div>
    );
}
