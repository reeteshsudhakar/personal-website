'use client'

import { Text, Center, Stack, Button, Group, Anchor } from '@mantine/core';
import classes from './ContactHero.module.css';
import { IconForms, IconCalendar, IconMail, IconBrandInstagram } from '@tabler/icons-react';

export function ContactHero() {
    return (
        <Center className={classes.wrapper}>
            <Stack align='center' justify='center'>
                <Text
                    className={classes.title}
                >
                    Let's get in touch!
                </Text>
                <Text
                    c='#FFFFFF'
                    p={'xl'}
                    ta='center'
                    size='l'
                >
                    Whether it's about technology, finance, music, or absolute nonsense, I'm always up for a chat. Feel free to reach out through any of the methods below!
                </Text>

                <Group align='center' justify='center' p={'md'}>
                    <Anchor href='/contact' underline='never'>
                        <Button
                            variant='light'
                            color='gray'
                            leftSection={<IconForms />}
                            radius={'md'}
                        >
                            <Text size='l'>Contact</Text>
                        </Button>
                    </Anchor>
                    <Anchor href='https://calendly.com/reesud6187/30min' underline='never' target='_blank'>
                        <Button
                            variant='filled'
                            color='teal'
                            leftSection={<IconCalendar />}
                            radius={'md'}
                        >
                            <Text size='l'>Schedule a meeting</Text>
                        </Button>
                    </Anchor>
                    <Anchor href='mailto:reesud6187@gmail.com' underline='never' target='_blank'>
                        <Button
                            variant='light'
                            color='gray'
                            leftSection={<IconMail />}
                            radius={'md'}
                        >
                            <Text size='l'>Email me!</Text>
                        </Button>
                    </Anchor>
                    <Anchor href='https://instagram.com/reeteshsudhakar' underline='never' target='_blank'>
                        <Button
                            variant='gradient'
                            gradient={{ deg: 206, from: 'pink', to: 'yellow' }}
                            leftSection={<IconBrandInstagram />}
                            radius={'md'}
                        >
                            <Text size='l'>Instagram</Text>
                        </Button>
                    </Anchor>
                </Group>
            </Stack>
        </Center>
    );
}