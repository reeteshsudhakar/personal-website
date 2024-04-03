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
    SegmentedControl,
    rem,
    Tooltip,
} from '@mantine/core';
import { useDisclosure, useMediaQuery, useHotkeys, useOs } from '@mantine/hooks';
import classes from './AppWrapper.module.css';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { useState, useEffect } from 'react';
import {
    IconGitBranch,
    IconFingerprint,
} from "@tabler/icons-react";
import { usePathname } from 'next/navigation';
import PasswordInputBlock from '../PasswordInputBlock/PasswordInputBlock';
import { navbarSection1Items } from '@/utils/constants';
import { NavbarFooter, NavbarSectionLinks, NavbarTextBlurb } from '../NavbarSections/NavbarSections';
import { Toaster } from 'react-hot-toast';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function AppWrapper({ children }: React.PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure();
    const [isMounted, setIsMounted] = useState(false);
    const [section, setSection] = useState<'section1' | 'section2'>('section1');
    const pathName = usePathname();
    const { data, error } = useSWR('/api/auth-status', fetcher)

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
            navbar={{ width: 275, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            withBorder={false}
        >
            <Toaster position="bottom-center" />
            {!isLargeScreen && (
                /* TODO: fix this so that the items are left, center, right */
                <AppShell.Header>
                    <Flex className={classes.header}>
                        <Group gap='xs'>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                            <Anchor href="/" underline='never'>
                                <Text fw={900} c={'white'}>Reetesh Sudhakar</Text>
                            </Anchor>
                        </Group>
                        <VersionBadge />
                    </Flex>
                </AppShell.Header>
            )}
            <AppShell.Navbar>
                <Flex className={classes.navbarContent}>
                    {isLargeScreen &&
                        <>
                            <Stack>
                                <AppShell.Section>
                                    <Group>
                                        <Anchor href="/" underline='never'>
                                            <Text fw={900} c={'white'}>Reetesh Sudhakar</Text>
                                        </Anchor>
                                        <VersionBadge />
                                    </Group>
                                </AppShell.Section>
                                <AppShell.Section>
                                    <NavbarTextBlurb />
                                </AppShell.Section>
                                <AppShell.Section component={ScrollArea} grow>
                                    <Flex direction={'column'} py={3}>
                                        <Tooltip label={label} withArrow position={'top'} className={classes.tooltip}>
                                            <SegmentedControl
                                                classNames={{ root: classes.segmentControl, indicator: classes.indicator }}
                                                value={section}
                                                onChange={(value: any) => setSection(value)}
                                                transitionTimingFunction="ease"
                                                radius='md'
                                                data={[
                                                    {
                                                        label: (
                                                            <Center style={{ gap: 5 }}>
                                                                <IconGitBranch style={{ width: rem(14), height: rem(14) }} />
                                                                <Text size='sm'>Main</Text>
                                                            </Center>
                                                        ),
                                                        value: 'section1'
                                                    },
                                                    {
                                                        label: (
                                                            <Center style={{ gap: 5 }}>
                                                                <IconFingerprint style={{ width: rem(14), height: rem(14) }} />
                                                                <Text size='sm'>Private</Text>
                                                            </Center>
                                                        ),
                                                        value: 'section2'
                                                    },
                                                ]}
                                                size='sm'
                                            />
                                        </Tooltip>
                                        {section === 'section1' &&
                                            <NavbarSectionLinks sectionItems={navbarSection1Items} pathName={pathName} />
                                        }
                                        {section === 'section2' &&
                                            <>
                                                {data.isAuthenticated ? (
                                                    <Text>Placeholder</Text>
                                                ) : (
                                                    <PasswordInputBlock />
                                                )}
                                            </>
                                        }
                                    </Flex>
                                </AppShell.Section>
                                <AppShell.Section pt={10}>
                                    <NavbarFooter />
                                </AppShell.Section>
                            </Stack>
                        </>
                    }
                </Flex>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell >
    );
}

export default AppWrapper;
