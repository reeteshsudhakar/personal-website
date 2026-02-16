"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/lib/use-media-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/constants";

interface ProjectCardProps {
    title: string;
    description: string;
    date: string;
    imagePath: string;
    tech: {
        icon: React.ElementType;
        name: string;
    }[];
    links?: {
        label: string;
        href: string;
        icon?: React.ElementType;
    }[];
    index: number;
}

function ProjectCard({ title, description, date, imagePath, tech, links, index }: ProjectCardProps) {
    const [imgSrc, setImgSrc] = useState(imagePath);
    const isLargeScreen = useMediaQuery("(min-width: 64em)");
    const placeholder = "https://placehold.co/300x300?text=" + encodeURIComponent(title);

    const cardInner = isLargeScreen ? (
        <div
            className={cn("flex flex-nowrap items-center gap-4 p-3", index % 2 === 0 ? "flex-row" : "flex-row-reverse")}
        >
            <div
                data-project-image
                className="relative h-[200px] w-[260px] shrink-0"
                style={{ overflow: "hidden", borderRadius: "var(--radius-xl)" }}
            >
                <Image
                    src={imgSrc}
                    alt=""
                    fill
                    className="object-contain"
                    onError={() => setImgSrc(placeholder)}
                    unoptimized={imgSrc === placeholder}
                />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2 p-1">
                <p className="font-bold text-black">{title}</p>
                <p className="text-xs font-bold uppercase text-muted-foreground">{date}</p>
                <p className="text-sm font-medium text-muted-foreground">{description}</p>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {tech.map((t) => (
                            <Tooltip key={t.name}>
                                <TooltipTrigger asChild>
                                    <div className="flex cursor-default items-center gap-1">
                                        <t.icon size={30} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>{t.name}</TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {links?.map((link) => (
                            <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="secondary"
                                    className="gap-2 bg-[#0172AF]/20 text-[#0172AF] hover:bg-[#0172AF]/30"
                                >
                                    {link.icon ? <link.icon className="size-5 shrink-0" /> : null}
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col p-3">
            <div
                data-project-image
                className="relative h-[180px] w-full shrink-0"
                style={{ overflow: "hidden", borderRadius: "var(--radius-xl)" }}
            >
                <Image
                    src={imgSrc}
                    alt=""
                    fill
                    className="object-cover"
                    onError={() => setImgSrc(placeholder)}
                    unoptimized={imgSrc === placeholder}
                />
            </div>
            <div className="flex flex-col gap-2 pt-2">
                <p className="font-bold text-black">{title}</p>
                <p className="text-xs font-bold uppercase text-muted-foreground">{date}</p>
                <p className="text-sm font-medium text-muted-foreground">{description}</p>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {tech.map((t) => (
                            <Tooltip key={t.name}>
                                <TooltipTrigger asChild>
                                    <div className="flex cursor-default items-center gap-1">
                                        <t.icon size={30} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>{t.name}</TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {links?.map((link) => (
                            <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="secondary"
                                    className="gap-2 bg-[#0172AF]/20 text-[#0172AF] hover:bg-[#0172AF]/30"
                                >
                                    {link.icon ? <link.icon className="size-5 shrink-0" /> : null}
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="overflow-hidden bg-white shadow-lg transition-all duration-150 hover:scale-[1.02] hover:shadow-xl">
            {cardInner}
        </Card>
    );
}

export function ProjectCardsSection() {
    return (
        <TooltipProvider>
            <div className="flex flex-col gap-8 pt-4">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        date={project.date}
                        imagePath={project.imagePath}
                        tech={project.tech}
                        links={project.links}
                        index={index}
                    />
                ))}
            </div>
        </TooltipProvider>
    );
}
