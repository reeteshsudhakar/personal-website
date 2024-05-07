import { Stack, Text } from "@mantine/core";
import classes from './SkillsSection.module.css';

export function SkillsSection() {
    return (
        <Stack p={'xl'}>
            <Text className={classes.title}>
                Skills, Tools, and Technologies
            </Text>
            <Text c='white' size='lg' ta='center'>
                These are some tools and technologies that I have experience with in various capacities, whether professional, academic, or personal. I'm always looking to expand my skillset!
            </Text>
        </Stack>
    );
}

export default SkillsSection;