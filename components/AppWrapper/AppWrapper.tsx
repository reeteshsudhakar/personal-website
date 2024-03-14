'use client'

import { Anchor, AppShell, Badge, Box, Burger, Button, Flex, Group, ScrollArea, Skeleton, Text, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './AppWrapper.module.css';
import { HeaderLinkButtons } from '../HeaderLinkButtons/HeaderLinkButtons';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { useState, useEffect } from 'react';

export function AppWrapper({ children }: React.PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Flex className={classes.groupStyle}>
                    {/* Left side elements */}
                    <Group className={classes.leftGroupStyle}>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Anchor href="/">
                            <Text
                                fw={900}
                                c={'white'}
                            >
                                Reetesh Sudhakar
                            </Text>

                        </Anchor>
                        <VersionBadge />
                    </Group>

                    {/* Right side elements */}
                    <Group gap='xs'>
                        <HeaderLinkButtons />
                    </Group>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppShell.Section>Navbar header</AppShell.Section>
                <AppShell.Section grow my="md" component={ScrollArea}>
                    60 links in a scrollable section
                    {Array(60)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} h={28} mt="sm" animate={false} />
                        ))}
                </AppShell.Section>
                <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell >
    );
}

export default AppWrapper;
