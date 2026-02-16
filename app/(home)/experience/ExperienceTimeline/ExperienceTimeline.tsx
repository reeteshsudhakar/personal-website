"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { experiences, formatExperienceDates, sortExperiencesByDate } from "@/lib/constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface ExperienceItem {
    title: string;
    company: string;
    companyLink: string;
    location: string;
    description: string;
    startDate: string;
    endDate: string | null;
    imagePath: string;
}

export function ExperienceTimeline() {
    const [selected, setSelected] = useState<ExperienceItem | null>(null);
    const sortedExperiences = useMemo(() => sortExperiencesByDate(experiences as ExperienceItem[]), []);

    return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
            <h2 className="mb-2 text-center text-[28px] font-extrabold text-[#0172AF] xs:text-left md:text-5xl">
                My Experience
            </h2>
            <p className="mb-6 max-w-2xl text-center text-lg text-white">
                Below is a summary of my experience, whether it be professional or personal. Feel free to check out my{" "}
                <Link href="/resume" className="text-primary underline underline-offset-2 hover:opacity-90">
                    résumé
                </Link>{" "}
                for a one-page summary. Click on each card to see more details.
            </p>
            <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedExperiences.map((exp) => (
                    <Card
                        key={exp.title + exp.startDate}
                        className="cursor-pointer border-border/50 bg-card/80 transition-all hover:scale-[1.02] hover:shadow-lg"
                        onClick={() => setSelected(exp)}
                    >
                        <CardContent className="flex flex-nowrap items-center gap-4 p-4">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                                <Image src={exp.imagePath} alt="" fill className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-white">{exp.company}</p>
                                <p className="text-sm text-muted-foreground">{exp.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatExperienceDates(exp.startDate, exp.endDate)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent className="max-h-[90vh] max-w-lg overflow-hidden border-border bg-card p-0 text-foreground">
                    {selected && (
                        <div className="flex max-h-[90vh] flex-col overflow-hidden">
                            <div className="shrink-0 px-6 pt-6">
                                <DialogHeader>
                                    <DialogTitle className="text-foreground">{selected.title}</DialogTitle>
                                </DialogHeader>
                                <a
                                    href={selected.companyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-[#50B384] hover:underline"
                                >
                                    {selected.company}
                                </a>
                                <p className="text-sm text-muted-foreground">{selected.location}</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatExperienceDates(selected.startDate, selected.endDate)}
                                </p>
                            </div>
                            <div className="min-h-0 flex-1 overflow-y-auto pl-6 pr-0 pb-8">
                                <div className="pr-6">
                                    <p className="mt-2 text-foreground">{selected.description}</p>
                                    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-md">
                                        <Image src={selected.imagePath} alt="" fill className="object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ExperienceTimeline;
