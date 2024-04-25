'use client'

import { Text, Center, Stack, Overlay } from '@mantine/core';
import classes from './AboutHero.module.css';

export function AboutHero() {
    return (
        <Center className={classes.wrapper}>
            <Stack align='center' justify='center'>
                <Text
                    className={classes.title}
                >
                    A Little Bit About Me
                </Text>
                <Text
                    c='#FFFFFF'
                    p={'xl'}
                    ta='justify'
                >
                    I am a B.S./M.S. student at Georgia Tech, with specializations in Artificial Intelligence and Modeling & Simulation.
                    I’m originally from Portland, OR. This summer, I’ll be a Software Engineer Intern at <Text span fw={700} c="#b08fcb">Chicago Trading Company. </Text>
                    Previously, I’ve interned at  <Text span fw={700} c="#5ac53b">Robinhood</Text> in the experimentation & dynamic configuration team, and at  <Text span fw={700} c="#439798">Siemens</Text>, where I
                    worked in proprietary software delivery. My main interests lie in backend development, creating development tools to aid
                    business and engineering teams, and data-driven solutions. Some languages, tools, and technologies I'm comfortable with include
                    Python, Java, Django, PostgreSQL, React (Next.js + Typescript), Git/GitHub/GitLab, Figma, and Atlassian products.
                </Text>
            </Stack>
        </Center>
    );
}