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
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classes from './AppWrapper.module.css';
import { HeaderLinkButtons } from '../HeaderLinkButtons/HeaderLinkButtons';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { useState, useEffect } from 'react';
import { IconSchool, IconFile, IconBrandGithub, IconPrompt, IconBrandFacebook, IconBrandInstagram, IconWriting, IconNews, IconBrandLinkedin, IconForms, IconMail } from "@tabler/icons-react";


export function NewAppWrapper({ children }: React.PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure();
    const [isMounted, setIsMounted] = useState(false);
    const [section, setSection] = useState<'section1' | 'section2'>('section1');

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
            navbar={{ width: 275, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
            withBorder={false}
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
            <AppShell.Navbar>
                <Flex className={classes.navbarContent}>
                    {isLargeScreen &&
                        <>
                            <Stack component={ScrollArea}>
                                <AppShell.Section>
                                    <Group>
                                        <Anchor href="/">
                                            <Text fw={900} c={'white'}>Reetesh Sudhakar</Text>
                                        </Anchor>
                                        <VersionBadge />
                                    </Group>
                                </AppShell.Section>
                                <AppShell.Section>
                                    <Flex className={classes.navbarTextBlurb}>
                                        <Stack gap='xs' py={10}>
                                            <Text ta='center' size='sm'>Software Developer 💻</Text>
                                            <Text ta='center' size='sm'>Dog Lover 🐶</Text>
                                            <Text ta='center' size='sm'>Continuous Learner 🚀</Text>
                                            <Text ta='center' size='sm'>Into Finance & Technology 📈</Text>
                                        </Stack>
                                    </Flex>
                                </AppShell.Section>
                                <AppShell.Section>
                                    <Flex direction={'column'} py={3}>
                                        <SegmentedControl
                                            value={section}
                                            onChange={(value: any) => setSection(value)}
                                            transitionTimingFunction="ease"
                                            fullWidth
                                            data={[
                                                { label: 'Section 1', value: 'section1' },
                                                { label: 'Section 2', value: 'section2' },
                                            ]}
                                        />
                                        {section === 'section1' &&
                                            <Flex className={classes.navbarItemGroup} direction={'column'}>
                                                <Stack>
                                                    <Text size='xs'>Professional</Text>
                                                    {/* TODO: abstract Anchor out into component */}
                                                    <Anchor>
                                                        <Group>
                                                            <IconSchool size={20} color='white' />
                                                            <Text c={'white'}>Experience</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconPrompt size={20} color='white' />
                                                            <Text c={'white'}>Projects</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconFile size={20} color='white' />
                                                            <Text c={'white'}>Résumé</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconBrandGithub size={20} color='white' />
                                                            <Text c={'white'}>GitHub Portfolio</Text>
                                                        </Group>
                                                    </Anchor>
                                                </Stack>
                                                <Stack>
                                                    <Text size='xs'>Personal Life</Text>
                                                    <Anchor>
                                                        <Group>
                                                            <IconBrandFacebook size={20} color='white' />
                                                            <Text c={'white'}>Facebook</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconBrandInstagram size={20} color='white' />
                                                            <Text c={'white'}>Instagram</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconNews size={20} color='white' />
                                                            <Text c={'white'}>Press</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconWriting size={20} color='white' />
                                                            <Text c={'white'}>Blog</Text>
                                                        </Group>
                                                    </Anchor>
                                                </Stack>
                                                <Stack>
                                                    <Text size='xs'>Let's Connect</Text>
                                                    <Anchor>
                                                        <Group>
                                                            <IconForms size={20} color='white' />
                                                            <Text c={'white'}>Contact</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconMail size={20} color='white' />
                                                            <Text c={'white'}>Email</Text>
                                                        </Group>
                                                    </Anchor>
                                                    <Anchor>
                                                        <Group>
                                                            <IconBrandLinkedin size={20} color='white' />
                                                            <Text c={'white'}>LinkedIn</Text>
                                                        </Group>
                                                    </Anchor>
                                                </Stack>
                                            </Flex>
                                        }
                                        {section === 'section2' &&
                                            <></>
                                        }
                                    </Flex>
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

export default NewAppWrapper;
