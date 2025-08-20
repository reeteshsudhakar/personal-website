'use client'

import {
    Anchor,
    AppShell,
    Burger,
    Center,
    Flex,
    Group,
    Loader,
    ScrollArea,
    Stack,
    Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery, useHotkeys, useOs } from '@mantine/hooks';
import classes from './AppWrapper.module.css';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { navbarSection1Items, fullName } from "@/utils/constants";
import {
    NavbarFooter,
    NavbarSectionLinks,
    NavbarSectionLinksSmall,
    NavbarTextBlurb,
} from "../NavbarSections/NavbarSections";
import { Toaster } from 'react-hot-toast';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function AppWrapper({ children }: React.PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure();
    const [isMounted, setIsMounted] = useState(false);
    const [section, setSection] = useState<'section1' | 'section2'>('section1');
    const pathName = usePathname();
    const { data, error } = useSWR('/api/auth-status', fetcher);

    // Use hotkeys to switch sections
    useHotkeys([['mod+j', () => setSection(section === 'section1' ? 'section2' : 'section1')]]);

    // Use theme.breakpoints.sm to get the 'sm' breakpoint value from theme
    const isLargeScreen = useMediaQuery('(min-width: 48em)');

    // Effect to set mounted state after initial mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const os = useOs();
    let label = 'Toggle - ';
    if (os === 'macos') {
        label += '⌘ J';
    } else if (os === 'windows' || os === 'linux') {
        label += 'Ctrl-J';
    }

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
            navbar={{ width: 275, breakpoint: "sm", collapsed: { mobile: !opened } }}
            withBorder={false}
        >
            <Toaster position="bottom-center" />
            {!isLargeScreen && (
                /* TODO: fix this so that the items are left, center, right */
                <AppShell.Header>
                    <Flex className={classes.header}>
                        <Group gap="xs">
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                            <Anchor href="/" underline="never">
                                <Text fw={900} c={"white"}>
                                    {fullName}
                                </Text>
                            </Anchor>
                        </Group>
                        <VersionBadge />
                    </Flex>
                </AppShell.Header>
            )}
            <AppShell.Navbar>
                <Flex className={classes.navbarContent}>
                    {isLargeScreen ? (
                        <>
                            <Stack>
                                <AppShell.Section>
                                    <Group justify="center">
                                        <Anchor href="/" underline="never">
                                            <Text fw={900} c={"white"}>
                                                {fullName}
                                            </Text>
                                        </Anchor>
                                        <VersionBadge />
                                    </Group>
                                </AppShell.Section>
                                <AppShell.Section>
                                    <NavbarTextBlurb />
                                </AppShell.Section>
                                <AppShell.Section component={ScrollArea} grow>
                                    <Flex direction={"column"} py={3}>
                                        <Stack gap={10}>
                                            <NavbarSectionLinks
                                                sectionItems={navbarSection1Items}
                                                pathName={pathName}
                                            />
                                        </Stack>
                                    </Flex>
                                </AppShell.Section>
                                <AppShell.Section>
                                    <NavbarFooter />
                                </AppShell.Section>
                            </Stack>
                        </>
                    ) : (
                        <ScrollArea>
                            <Stack>
                                <Stack gap={10}>
                                    <NavbarSectionLinksSmall sectionItems={navbarSection1Items} pathName={pathName} />
                                </Stack>
                            </Stack>
                        </ScrollArea>
                    )}
                </Flex>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}

export default AppWrapper;
