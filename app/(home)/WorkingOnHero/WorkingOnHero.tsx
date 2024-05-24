'use client'

import { Text, Center, Stack, Button, Group, Anchor } from '@mantine/core';
import classes from './WorkingOnHero.module.css';
import { IconPrompt, IconWriting } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export function WorkingOnHero() {
    const isLargeScreen = useMediaQuery('(min-width: 48em)');

    return (
        <Center className={isLargeScreen ? classes.wrapper : classes.wrapperSmall}>
            <Stack align='center' justify='center'>
                <Text
                    className={classes.title}
                >
                    What am I working on?
                </Text>
                <Text
                    c='#FFFFFF'
                    p={'xl'}
                    ta='center'
                    size='xl'
                >
                    Currently building a website for my a cappella group, this website, a second brain, and some basic dev tools to self-host that'll make my life easier. I'm also carving out time to write more. Stay tuned to see some progress on these!
                </Text>

                <Group align='center' justify='center'>
                    <Anchor href='/projects' underline='never'>
                        <Button
                            variant='light'
                            color='gray'
                            leftSection={<IconPrompt />}
                            radius={'md'}
                            size='md'
                        >
                            <Text size='l' fw={700}>View my projects</Text>
                        </Button>
                    </Anchor>
                    <Anchor href='/blog' underline='never'>
                        <Button
                            variant='light'
                            color='teal'
                            leftSection={<IconWriting />}
                            radius={'md'}
                            size='md'
                        >
                            <Text size='l' fw={700}>Check out my blog!</Text>
                        </Button>
                    </Anchor>
                </Group>
            </Stack>
        </Center>
    );
}