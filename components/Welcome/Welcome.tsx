'use client'

import { Title, Text, Center, Stack } from '@mantine/core';
import classes from './Welcome.module.css';

interface WelcomeProps {
    pageTitle: string;
}

export function Welcome(props: WelcomeProps) {

    return (
        <Center>
            <Stack>
                <Title className={classes.title} ta="center" mt={100}>
                    Ruh{' '}
                    <Text inherit variant="gradient" component="span" gradient={{ from: 'green', to: 'cyan' }}>
                        Roh{' '}
                    </Text>
                    <Text inherit component='span'>
                        🚧
                    </Text>
                </Title>
                <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
                    Right now, the {props.pageTitle} page is a work in progress. Stay tuned for updates!
                </Text>
            </Stack>
        </Center>
    );
}
