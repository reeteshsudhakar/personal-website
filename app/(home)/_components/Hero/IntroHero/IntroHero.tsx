import { HeroSection } from "../HeroSection";
import introHeroBackground from "@/public/heros/intro-hero-background-small.jpg";

export function IntroHero() {
    return (
        <HeroSection image={introHeroBackground} imageAlt="" priority>
            <h1 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                Hi! I&apos;m Reetesh.
            </h1>
            <p className="px-4 py-2 text-center text-xl text-white">
                I&apos;m a recent Computer Science graduate from Georgia Tech! I&apos;m passionate about finance,
                technology, and music (and most importantly, I love dogs). Scroll to learn more.
            </p>
        </HeroSection>
    );
}
