import ExperienceTimeline from "./ExperienceTimeline/ExperienceTimeline";
import SkillsSection from "./skills/SkillsSection";
import { ContactButtons } from "./ContactButtons/ContactButtons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience",
    description: "A summary of my professional experience.",
    openGraph: {
        title: "Experience | Reetesh Sudhakar",
        description: "A summary of my professional experience.",
        type: "website",
    },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
            <ExperienceTimeline />
            <SkillsSection />
            <ContactButtons />
        </div>
    );
}
