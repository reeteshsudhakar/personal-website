import React from 'react';
import {
    Anchor,
    Flex,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { theme } from '../../theme';
import classes from './NavbarSections.module.css';
import { navbarFooterItems, navbarBlurbs } from '@/utils/constants';

interface NavbarItem {
    label: string;
    icon: React.ElementType;
    href: string;
}

interface SectionItems {
    [key: string]: NavbarItem[];
}

interface NavbarSectionsProps {
    sectionItems: SectionItems;
    pathName?: string | null;
}

interface NavbarIconProps {
    Icon: React.ElementType;
    size: number;
}

function NavbarIcon({ Icon, size }: NavbarIconProps) {
    return <Icon size={size} color="white" />;
}


export function NavbarSectionLinks({ sectionItems, pathName }: NavbarSectionsProps) {
    return (
        <Flex direction={'column'}>
            {Object.keys(sectionItems).map((section, index) => (
                <Stack key={index} py={15} gap={7}>
                    <Text size='xs' c={theme.colors?.dark ? theme.colors.dark[0] : 'white'}>{section}</Text>
                    {sectionItems[section].map((item, index) => (
                        <Anchor
                            key={index}
                            href={item.href}
                            underline='never'
                        >
                            <Group className={pathName === item.href ? classes.activeLink : classes.link}>
                                <NavbarIcon Icon={item.icon} size={20} />
                                <Text c={'white'}>{item.label}</Text>
                            </Group>
                        </Anchor>
                    ))}
                </Stack>
            ))}
        </Flex>
    );
};

export function NavbarFooter() {
    return (
        <Stack justify='center' align='center' gap={'xs'}>
            <Text size='xs'>{navbarFooterItems.text}</Text>
            <Group>
                {navbarFooterItems.links.map((link, index) => (
                    <Anchor key={index} href={link.href}>
                        <NavbarIcon Icon={link.icon} size={25} />
                    </Anchor>
                ))}
            </Group>
        </Stack>
    );
}

export function NavbarTextBlurb() {
    return (
        <Flex className={classes.navbarTextBlurb}>
            <Stack gap='xs' py={3}>
                {navbarBlurbs.map((blurb, index) => (
                    <Text key={index} size='sm' ta={'center'} c={theme.colors?.dark ? theme.colors.dark[0] : 'white'}>{blurb}</Text>
                ))}
            </Stack>
        </Flex>
    );
}
