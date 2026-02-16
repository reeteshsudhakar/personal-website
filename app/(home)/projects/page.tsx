import ProjectsContainer from "./ProjectsContainer/ProjectsContainer";
import { ProjectCardsSection } from "@/components/ProjectCard/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "A collection of my software engineering projects, including web applications, data visualizations, machine learning models, and more.",
    openGraph: {
        title: "Projects | Reetesh Sudhakar",
        description:
            "A collection of my software engineering projects, including web applications, data visualizations, machine learning models, and more.",
        type: "website",
    },
};

export default function Page() {
    return (
        <ProjectsContainer>
            <ProjectCardsSection />
        </ProjectsContainer>
    );
}
