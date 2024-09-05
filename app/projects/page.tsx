import ProjectsContainer from "./ProjectsContainer/ProjectsContainer";
import { ProjectCardsSection } from "@/components/ProjectCard/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Reetesh Sudhakar",
    description: "Descriptions about my various endeavors into various projects that I'm passionate about!",
};

export default function Page() {
    return (
        <ProjectsContainer>
            <ProjectCardsSection />
        </ProjectsContainer>
    );
}
