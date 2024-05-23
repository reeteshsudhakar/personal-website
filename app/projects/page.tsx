import ProjectsContainer from "./ProjectsContainer/ProjectsContainer";
import { Stack, Text } from "@mantine/core";
import { ProjectCardsSection } from "@/components/ProjectCard/ProjectCard";

export default function HomePage() {
    return (
        <ProjectsContainer>
            <ProjectCardsSection />
        </ProjectsContainer>
    );
}
