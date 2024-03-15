'use client'

import {
    Anchor,
    AppShell,
    Badge,
    Box,
    Burger,
    Button,
    Center,
    Container,
    Flex,
    Group,
    Loader,
    ScrollArea,
    Skeleton,
    Stack,
    Text,
    useMantineTheme
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classes from './AppWrapper.module.css';
import { HeaderLinkButtons } from '../HeaderLinkButtons/HeaderLinkButtons';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { useState, useEffect } from 'react';

export function NewAppWrapper({ children }: React.PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure();
    const [isMounted, setIsMounted] = useState(false);

    // Use theme.breakpoints.sm to get the 'sm' breakpoint value from theme
    const isLargeScreen = useMediaQuery('(min-width: 48em)');

    // Effect to set mounted state after initial mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {

        return (
            <Center className={classes.loader}>
                <Loader color="teal" size="xl" type="dots" />
            </Center>
        );
    }

    return (
        <AppShell
            header={!isLargeScreen ? { height: 60 } : undefined} // Only show header on small screens
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            {!isLargeScreen && (
                <AppShell.Header>
                    <Flex className={classes.header}>
                        <Group className={classes.nameBadge}>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                            <Anchor href="/">
                                <Text fw={900} c={'white'}>Reetesh Sudhakar</Text>
                            </Anchor>
                            <VersionBadge />
                        </Group>
                        <Group gap='xs'>
                            <HeaderLinkButtons />
                        </Group>
                    </Flex>
                </AppShell.Header>
            )}
            <AppShell.Navbar p="md">
                {isLargeScreen && (
                    <>
                        <AppShell.Section>
                            <Flex className={classes.navbarTop}>
                                <Group className={classes.nameBadge}>
                                    <Anchor href="/">
                                        <Text fw={900} c={'white'}>Reetesh Sudhakar</Text>
                                    </Anchor>
                                    <VersionBadge />
                                </Group>
                            </Flex>
                        </AppShell.Section>
                        <AppShell.Section>
                            <Flex className={classes.navbarText}>
                                <Stack gap='xs'>
                                    <Text ta='center' size='sm'>Software Developer.</Text>
                                    <Text ta='center' size='sm'>Dog Lover.</Text>
                                    <Text ta='center' size='sm'>Lifelong Learner.</Text>
                                </Stack>
                            </Flex>
                        </AppShell.Section>
                    </>
                )}
                <AppShell.Section grow my="md" component={ScrollArea}>
                    {/* Navbar content */}
                </AppShell.Section>
                <AppShell.Section>
                    {/* Footer content */}
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell >
    );
}

export default NewAppWrapper;
