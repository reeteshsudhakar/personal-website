'use client'

import { Text, Center, Stack } from '@mantine/core';
import classes from './AboutHero.module.css';
import { useMediaQuery } from '@mantine/hooks';

export function AboutHero() {
    const isLargeScreen = useMediaQuery('(min-width: 48em)');

    return (
        <Center className={isLargeScreen ? classes.wrapper : classes.wrapperSmall}>
            <Stack align="center" justify="center">
                <Text className={classes.title}>A Little Bit About Me</Text>
                <Text c="#FFFFFF" p={"xl"} ta="center" size="xl">
                    I recently completed my B.S. and M.S. in Computer Science at Georgia Tech. I'm a Software Engineer
                    at{" "}
                    <Text span fw={700} c="#b08fcb">
                        Chicago Trading Company.{" "}
                    </Text>
                    I'm into full-stack development, and I love working with data. I'm also a huge fan of music - I've
                    done choir, a cappella, and Carnatic music!
                </Text>
            </Stack>
        </Center>
    );
}