'use client'

import { Text, Center, Stack, Button, Group, Anchor } from '@mantine/core';
import classes from './WorkingOnHero.module.css';
import { IconPrompt, IconWriting } from '@tabler/icons-react';

export function WorkingOnHero() {
    return (
        <Center className={classes.wrapper}>
            <Stack align='center' justify='center'>
                <Text
                    className={classes.title}
                >
                    What am I working on?
                </Text>
                <Text
                    c='#FFFFFF'
                    p={'xl'}
                    ta='justify'
                >
                    I've been messing around with a lot of different things lately, technical and otherwise. Some notable things - a website for my a cappella group, this website,
                    a dashboard for my personal finances and daily news supercharged by AI, and some basic dev tools to self-host on my own website to make my daily life easier. I'm
                    also carving out time to write more, and also work on an a cappella arrangement. Stay tuned for more!
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