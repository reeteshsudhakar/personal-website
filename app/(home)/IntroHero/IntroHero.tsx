'use client'

import { Text, Center, Stack } from '@mantine/core';
import classes from './IntroHero.module.css';
import { useMediaQuery } from '@mantine/hooks';

export function IntroHero() {
    const isLargeScreen = useMediaQuery('(min-width: 48em)');

    return (
        <Center className={isLargeScreen ? classes.wrapper : classes.wrapperSmall}>
            <Stack align="center" justify="center" p={"lg"}>
                <Text className={classes.title}>Hi! I'm Reetesh.</Text>
                <Text c="#FFFFFF" p={"sm"} ta="center" size="xl">
                    I'm a recent Computer Science graduate from Georgia Tech! I'm passionate about finance, technology,
                    and music (and most importantly, I love dogs 🐶). Scroll to learn more ⬇️
                </Text>
            </Stack>
        </Center>
    );
}