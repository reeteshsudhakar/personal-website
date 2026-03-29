"use client";

import React from "react";
import { skills } from "@/lib/constants";
import { Card } from "@/components/ui/card";

interface SkillCardIconProps {
    Icon: React.ElementType;
    size: number;
}

function SkillCardIcon({ Icon, size }: SkillCardIconProps) {
    return <Icon size={size} />;
}

function SkillCards() {
    return (
        <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-[repeat(2,minmax(0,5fr))] md:grid-cols-3 lg:grid-cols-6">
            {skills.map((skill) => (
                <Card
                    key={skill.title}
                    className="flex h-[160px] w-[150px] overflow-hidden bg-black p-0 transition-transform duration-100 hover:scale-105 hover:shadow-xl"
                >
                    <div className="flex h-full flex-col">
                        <div className="flex flex-1 items-center justify-center px-4 pt-4">
                            <SkillCardIcon Icon={skill.icon} size={70} />
                        </div>
                        <div className="px-3 pb-4 pt-2">
                            <p className="text-center font-bold leading-tight">{skill.title}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default SkillCards;
