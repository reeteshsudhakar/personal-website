"use client";

import React from "react";
import { Paper, Text, Center, Group, Grid } from "@mantine/core";
import { skills } from "@/utils/constants";
import classes from "./SkillCard.module.css";

interface SkillCardIconProps {
    Icon: React.ElementType;
    size: number;
}

function SkillCardIcon({ Icon, size }: SkillCardIconProps) {
    return <Icon size={size} />;
}

function SkillCards() {
    return (
        <Grid justify="center" align="center">
            {skills.map((skill) => (
                <Grid.Col span={{ xs: 6, sm: 5, md: 4, lg: 2 }} key={skill.title}>
                    <Paper shadow="sm" radius="md" p={"lg"} className={classes.card}>
                        <Center style={{ flexGrow: 1, justifyContent: "center" }}>
                            <SkillCardIcon Icon={skill.icon} size={75} />
                        </Center>
                        <Text fw={700} ta="center" style={{ padding: "10px 0" }}>
                            {skill.title}
                        </Text>
                    </Paper>
                </Grid.Col>
            ))}
        </Grid>
    );
}

export default SkillCards;
