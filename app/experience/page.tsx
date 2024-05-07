'use client'

import ExperienceTimeline from "./ExperienceTimeline/ExperienceTimeline";
import { Stack } from "@mantine/core";
import SkillsSection from "./skills/SkillsSection";
import { ContactButtons } from "./ContactButtons/ContactButtons";

export default function HomePage() {
    return (
        <Stack align='center' justify='center' p={'xl'}>
            <ExperienceTimeline />
            <SkillsSection />
            <ContactButtons />
        </Stack>
    );
}
