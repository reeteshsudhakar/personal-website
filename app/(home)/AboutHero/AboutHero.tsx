'use client'

import { Text, Center, Stack } from '@mantine/core';
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
                    I recently completed my B.S. in Computer Science at Georgia Tech, with specializations in Artificial Intelligence and Modeling & Simulation.
                    I’m originally from Portland, OR. This summer, I’ll be a Software Engineer Intern at <Text span fw={700} c="#b08fcb">Chicago Trading Company. </Text>
                    My main interests lie in backend development, creating development tools to aid business and engineering teams, and data-driven solutions.
                </Text>
            </Stack>
        </Center>
    );
}