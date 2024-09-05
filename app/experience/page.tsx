import ExperienceTimeline from "./ExperienceTimeline/ExperienceTimeline";
import { Stack } from "@mantine/core";
import SkillsSection from "./skills/SkillsSection";
import { ContactButtons } from "./ContactButtons/ContactButtons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience | Reetesh Sudhakar",
    description: "A summary of my professional experience and skillset!",
};

export default function Page() {
    return (
        <Stack align="center" justify="center" p={"xl"}>
            <ExperienceTimeline />
            <SkillsSection />
            <ContactButtons />
        </Stack>
    );
}
