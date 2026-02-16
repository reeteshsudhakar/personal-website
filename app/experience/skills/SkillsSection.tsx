"use client";

import SkillCards from "@/components/SkillCard/SkillCard";

export function SkillsSection() {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h2 className="mb-2 px-4 text-center text-[28px] font-extrabold text-[#0172AF] xs:text-left md:text-5xl">
                Skills, Tools, and Technologies
            </h2>
            <p className="mb-6 max-w-2xl text-center text-lg text-white">
                These are some tools and technologies that I have experience with in various capacities, whether
                professional, academic, or personal. I&apos;m always looking to expand my skillset!
            </p>
            <div className="flex items-center justify-center">
                <SkillCards />
            </div>
        </div>
    );
}

export default SkillsSection;
