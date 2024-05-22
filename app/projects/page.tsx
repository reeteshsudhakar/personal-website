import ProjectsContainer from "./ProjectsContainer/ProjectsContainer";
import { Stack, Text } from "@mantine/core";
import { projectsPageBlurb } from "@/utils/constants";

export default function HomePage() {
    return (
        <ProjectsContainer>
            <Stack
                pb={'xl'}
                pl={'xl'}
                pr={'xl'}
                align="center"
                justify="center"
            >
                <Text
                    size="lg"
                    fw={500}
                    c={'#5C5F66'}
                >
                    {projectsPageBlurb}
                </Text>
            </Stack>
        </ProjectsContainer>
    );
}
