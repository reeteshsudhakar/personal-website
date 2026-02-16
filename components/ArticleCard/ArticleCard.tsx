"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/lib/use-media-query";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "https://placehold.co/250x200?text=Image+Unavailable";

interface ArticleCardProps {
    source: string;
    title: string;
    imagePath: string;
    date: string;
    author: string;
    href: string;
}

export default function ArticleCard({ source, title, imagePath, date, author, href }: ArticleCardProps) {
    const [imgSrc, setImgSrc] = useState(imagePath);
    const isLargeScreen = useMediaQuery("(min-width: 36em)");

    const cardContent = (
        <Card
            className={cn(
                "relative max-w-[1000px] overflow-hidden bg-white p-0 pl-1.5 shadow-lg gap-0 transition-all duration-150 hover:scale-[1.02] hover:shadow-xl",
                "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-gradient-to-b before:from-[#0172AF] before:to-[#50B384]",
            )}
        >
            {isLargeScreen ? (
                <div className="flex min-h-[200px] flex-nowrap items-stretch">
                    <div className="relative min-h-0 w-[250px] shrink-0 self-stretch">
                        <Image
                            src={imgSrc}
                            alt=""
                            fill
                            className="object-cover"
                            onError={() => setImgSrc(FALLBACK_IMAGE)}
                            unoptimized={imgSrc === FALLBACK_IMAGE}
                        />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
                        <p className="text-xs font-bold uppercase text-muted-foreground">{source}</p>
                        <p className="mb-4 mt-1 font-bold leading-tight text-black">{title}</p>
                        <div className="flex flex-nowrap items-center gap-1 text-xs text-muted-foreground">
                            <span>{author}</span>
                            <span>•</span>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="relative h-40 w-full shrink-0">
                        <Image
                            src={imgSrc}
                            alt=""
                            fill
                            className="object-cover"
                            onError={() => setImgSrc(FALLBACK_IMAGE)}
                            unoptimized={imgSrc === FALLBACK_IMAGE}
                        />
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="text-xs font-bold uppercase text-muted-foreground">{source}</p>
                        <p className="mb-4 mt-1 font-bold leading-tight text-black">{title}</p>
                        <div className="flex flex-nowrap items-center gap-1 text-xs text-muted-foreground">
                            <span>{author}</span>
                            <span>•</span>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
            {cardContent}
        </Link>
    );
}
