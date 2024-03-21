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
    Skeleton,
    rem,
    Tooltip,
} from '@mantine/core';
import { useDisclosure, useMediaQuery, useHotkeys, useOs } from '@mantine/hooks';
import classes from './AppWrapper.module.css';
import { HeaderLinkButtons } from '../HeaderLinkButtons/HeaderLinkButtons';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { useState, useEffect } from 'react';
import {
    IconSchool,
    IconFile,
    IconBrandGithub,
    IconPrompt,
    IconBrandFacebook,
    IconBrandInstagram,
    IconWriting,
    IconNews,
    IconBrandLinkedin,
    IconForms,
    IconMail,
    IconGitBranch,
    IconFingerprint,
    IconBrandNextjs,
    IconBrandMantine,
} from "@tabler/icons-react";
import { theme } from '../../theme';
import { usePathname } from 'next/navigation';

const navbarBlurbs = [
    'Software Developer 💻',
    'Dog Lover 🐶',
    'Continuous Learner 🚀',
    'Into Finance & Technology 📈',
];

const navbarSection1Items = {
    'Professional': [
        {
            label: 'Experience', icon: <IconSchool size={20} color='white' />, href: '/experience'
        },
        {
            label: 'Projects', icon: <IconPrompt size={20} color='white' />, href: '/projects'
        },
        {
            label: 'Résumé', icon: <IconFile size={20} color='white' />, href: '/resume'
        },
        {
            label: 'GitHub Portfolio', icon: <IconBrandGithub size={20} color='white' />, href: 'https://www.github.com/reeteshsudhakar'
        }
    ],
    'Personal Life': [
        {
            label: 'Facebook', icon: <IconBrandFacebook size={20} color='white' />, href: 'https://www.facebook.com/reetesh.sudhakar.3'
        },
        {
            label: 'Instagram', icon: <IconBrandInstagram size={20} color='white' />, href: 'https://www.instagram.com/reeteshsudhakar/'
        },
        {
            label: 'Press', icon: <IconNews size={20} color='white' />, href: '/press'
        },
        {
            label: 'Blog', icon: <IconWriting size={20} color='white' />, href: '/blog'
        }
    ],
    'Let\'s Connect': [
        {
            label: 'Contact', icon: <IconForms size={20} color='white' />, href: '/contact'
        },
        {
            label: 'Email', icon: <IconMail size={20} color='white' />, href: 'mailto:reesud6187@gmail.com'
        },
        {
            label: 'LinkedIn', icon: <IconBrandLinkedin size={20} color='white' />, href: 'https://www.linkedin.com/in/reeteshsudhakar/'
        }
    ]
}

export function NewAppWrapper({ children }: React.PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure();
    const [isMounted, setIsMounted] = useState(false);
    const [section, setSection] = useState<'section1' | 'section2'>('section1');
    const pathName = usePathname();

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
            {!isLargeScreen && (
                <AppShell.Header>
                    <Flex className={classes.header}>
                        <Group className={classes.nameBadge}>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                            <Anchor href="/" underline='never'>
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
                                    <Flex className={classes.navbarTextBlurb}>
                                        <Stack gap='xs' py={3}>
                                            {navbarBlurbs.map((blurb, index) => (
                                                <Text key={index} size='sm' ta={'center'} c={theme.colors?.dark ? theme.colors.dark[0] : 'white'}>{blurb}</Text>
                                            ))}
                                        </Stack>
                                    </Flex>
                                </AppShell.Section>
                                <AppShell.Section component={ScrollArea} grow>
                                    <Flex direction={'column'} py={3}>
                                        <Tooltip label={label} withArrow position={'top'} className={classes.tooltip}>
                                            <SegmentedControl
                                                className={classes.segmentControl}
                                                value={section}
                                                onChange={(value: any) => setSection(value)}
                                                transitionTimingFunction="ease"
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
                                            <Flex direction={'column'}>
                                                {
                                                    Object.keys(navbarSection1Items).map((section, index) => {
                                                        return (
                                                            <Stack key={index} py={15} gap={7}>
                                                                <Text size='xs' c={theme.colors?.dark ? theme.colors.dark[0] : 'white'}>{section}</Text>
                                                                {navbarSection1Items[section as keyof typeof navbarSection1Items].map((item, index) => {
                                                                    return (
                                                                        <Anchor
                                                                            key={index}
                                                                            href={item.href}
                                                                            underline='never'
                                                                        >
                                                                            <Group
                                                                                className={pathName === item.href ? classes.activeLink : classes.link}
                                                                            >
                                                                                {item.icon}
                                                                                <Text c={'white'}>{item.label}</Text>
                                                                            </Group>
                                                                        </Anchor>
                                                                    )
                                                                })}
                                                            </Stack>
                                                        )
                                                    })
                                                }
                                            </Flex>
                                        }
                                        {section === 'section2' &&
                                            <>
                                                {Array(60)
                                                    .fill(0)
                                                    .map((_, index) => (
                                                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                                                    ))}
                                            </>
                                        }
                                    </Flex>
                                </AppShell.Section>
                                <AppShell.Section pt={10}>
                                    <Stack justify='center' align='center' gap={'xs'}>
                                        <Text size='xs'>Made by Reetesh Sudhakar with</Text>
                                        <Group>
                                            <Anchor href='https://nextjs.org'>
                                                <IconBrandNextjs size={25} color='white' />
                                            </Anchor>
                                            <Anchor href='https://mantine.dev'>
                                                <IconBrandMantine size={25} color='white' />
                                            </Anchor>
                                        </Group>
                                    </Stack>
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
