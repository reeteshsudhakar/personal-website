import { HeroSection } from "../HeroSection";
import aboutBackground from "@/public/heros/about-background.png";

export function AboutHero() {
    return (
        <HeroSection image={aboutBackground} imageAlt="">
            <h2 className="px-4 text-center text-[28px] font-extrabold text-white xs:text-left md:text-5xl">
                A Little Bit About Me
            </h2>
            <p className="max-w-3xl px-6 py-8 text-center text-xl text-white">
                I recently completed my B.S. and M.S. in Computer Science at Georgia Tech. I&apos;m a Software Engineer
                at <span className="font-bold text-[#d6b6ef]">Chicago Trading Company.</span> I&apos;m into full-stack
                development, and I love working with data. I&apos;m also a huge fan of music - I&apos;ve done choir, a
                cappella, and Carnatic music!
            </p>
        </HeroSection>
    );
}
