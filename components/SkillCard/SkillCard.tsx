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
                    className="flex h-[150px] w-[150px] flex-col justify-between bg-black p-4 transition-transform duration-100 hover:scale-105 hover:shadow-xl"
                >
                    <div className="flex flex-1 items-center justify-center">
                        <SkillCardIcon Icon={skill.icon} size={75} />
                    </div>
                    <p className="py-2.5 text-center font-bold">{skill.title}</p>
                </Card>
            ))}
        </div>
    );
}

export default SkillCards;
