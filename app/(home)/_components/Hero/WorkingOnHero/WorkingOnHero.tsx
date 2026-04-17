import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "../HeroSection";
import workingOnBackground from "@/public/heros/working-on-background.png";

export function WorkingOnHero() {
    return (
        <HeroSection image={workingOnBackground} imageAlt="">
            <h2 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                What am I working on?
            </h2>
            <p className="max-w-3xl px-6 py-8 text-center text-xl text-white">
                Recently built a few websites, overhauled the AI course (CS 3600) curriculum and infrastructure at
                Georgia Tech. I&apos;m maintaining this website, working on a second brain, and some basic dev tools to
                self-host to simplify my life. I&apos;m also carving out time to write more. Stay tuned to see the
                progress!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                    asChild
                    variant="secondary"
                    size="default"
                    className="gap-2 bg-white/20 font-bold text-white hover:bg-white/30"
                >
                    <Link href="/projects" className="no-underline">
                        <Sparkles className="size-4" />
                        View my projects
                    </Link>
                </Button>
            </div>
        </HeroSection>
    );
}
