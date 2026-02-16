"use client";

import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { navbarFooterItems, navbarBlurbs } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavbarItem {
    label: string;
    icon: React.ElementType;
    href: string;
}

interface SectionItems {
    [key: string]: NavbarItem[];
}

interface NavbarSectionsProps {
    sectionItems: SectionItems;
    pathName?: string | null;
    onLinkClick?: () => void;
}

interface NavbarIconProps {
    Icon: React.ElementType;
    size: number;
}

function NavbarIcon({ Icon, size }: NavbarIconProps) {
    return <Icon size={size} className="text-white" />;
}

export function NavbarSectionLinks({ sectionItems, pathName }: NavbarSectionsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useLayoutEffect(() => {
        const pill = pillRef.current;
        const container = containerRef.current;
        if (!pill || !container) return;

        if (hoveredIndex === null) {
            pill.style.visibility = "hidden";
            return;
        }

        const el = rowRefs.current[hoveredIndex];
        if (!el) {
            pill.style.visibility = "hidden";
            return;
        }

        const containerRect = container.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        pill.style.top = `${elRect.top - containerRect.top}px`;
        pill.style.height = `${elRect.height}px`;
        pill.style.visibility = "visible";
    }, [hoveredIndex]);

    let flatIndex = 0;
    return (
        <div ref={containerRef} className="relative flex flex-col px-3">
            {/* Moving hover pill - position updated via ref to avoid re-render jitter */}
            <div
                ref={pillRef}
                className="pointer-events-none absolute left-2 right-2 rounded-md bg-white/10 transition-all duration-200 ease-out"
                style={{ visibility: "hidden" }}
                aria-hidden
            />
            {Object.keys(sectionItems).map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2 pt-4 first:pt-0">
                    <p className="text-xs text-white/90">{section}</p>
                    {sectionItems[section].map((item, i) => {
                        const index = flatIndex++;
                        const isActive = pathName === item.href;
                        return (
                            <Link
                                key={i}
                                href={item.href}
                                className="no-underline"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div
                                    ref={(el) => {
                                        rowRefs.current[index] = el;
                                    }}
                                    className={cn(
                                        "relative z-[1] flex items-center gap-2 rounded-md px-2 py-1.5 text-white transition-colors",
                                        isActive && "bg-[#50B384]",
                                    )}
                                >
                                    <NavbarIcon Icon={item.icon} size={20} />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export function NavbarFooter() {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-xs text-white">{navbarFooterItems.text}</p>
            <div className="flex items-center gap-2">
                {navbarFooterItems.links.map((link, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition-opacity duration-150 hover:opacity-80"
                            >
                                <NavbarIcon Icon={link.icon} size={25} />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="top">{link.label}</TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}

export function NavbarTextBlurb({ align = "center" }: { align?: "left" | "center" }) {
    return (
        <div
            className={cn(
                "flex gap-4",
                align === "center" && "items-center justify-center",
                align === "left" && "items-start justify-start",
            )}
        >
            <div className={cn("space-y-1 py-1", align === "center" && "text-center", align === "left" && "text-left")}>
                {navbarBlurbs.map((blurb, index) => (
                    <p key={index} className="text-sm text-white/90">
                        {blurb}
                    </p>
                ))}
            </div>
        </div>
    );
}

export function NavbarSectionLinksSmall({ sectionItems, pathName, onLinkClick }: NavbarSectionsProps) {
    return (
        <div className="flex flex-col px-0">
            {Object.keys(sectionItems).map((section, index) => (
                <div key={index} className="space-y-2 pt-3 first:pt-0">
                    <p className="text-xs text-white/90">{section}</p>
                    {sectionItems[section].map((item, i) => (
                        <Link key={i} href={item.href} className="no-underline" onClick={onLinkClick}>
                            <div
                                className={cn(
                                    "flex items-center gap-2 rounded-md py-1.5 pl-0 pr-2 text-white transition-colors duration-150 hover:bg-white/10",
                                    pathName === item.href && "bg-[#50B384]",
                                )}
                            >
                                <NavbarIcon Icon={item.icon} size={20} />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
}
