import { projectsPageBlurb } from "@/lib/constants";

export default function ProjectsContainer({ children }: React.PropsWithChildren) {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#f1f3fa] bg-cover bg-center px-4 py-8 md:px-8">
            <h1 className="px-4 text-center text-[28px] font-extrabold text-[#0172AF] xs:text-left md:text-5xl">
                Projects and Pursuits
            </h1>
            <div className="flex max-w-[1000px] flex-col items-center justify-center px-8 py-4">
                <p className="text-center text-lg font-medium text-[#5C5F66]">{projectsPageBlurb}</p>
            </div>
            {children}
        </div>
    );
}
