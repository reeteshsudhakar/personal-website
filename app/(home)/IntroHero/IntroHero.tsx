'use client'

import { Text, Center, Stack } from '@mantine/core';
import classes from './IntroHero.module.css';

export function IntroHero() {
    return (
        <Center className={classes.wrapper}>
            <Stack align='center' justify='center' p={'lg'}>
                <Text
                    className={classes.title}
                >
                    Hi! I'm Reetesh.
                </Text>
                <Text
                    c='#FFFFFF'
                    p={'sm'}
                    ta='center'
                >
                    I'm a M.S. Computer Science student at Georgia Tech! I'm passionate about finance, technology, and music.
                    Scroll to learn more ⬇️
                </Text>
            </Stack>
        </Center>
    );
}