'use client'

import { Button, Box, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconBrandGithub, IconCalendar } from "@tabler/icons-react";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";

export function HeaderLinkButtons() {
    const { colorScheme } = useMantineColorScheme();
    const dark = useComputedColorScheme('dark') === 'dark';
    return (
        <>
            <Button
                size="xs"
                variant="default"
                leftSection={<IconBrandGithub size={16} />}
                component="a"
                aria-label={`View source code on GitHub`}
                href={'https://www.github.com/reeteshsudhakar/personal-website'}
                target="_blank"
                visibleFrom='xs'
            >
                Source
                <Box component="span" visibleFrom="sm">
                    &nbsp;Code
                </Box>
            </Button>
            <Button
                size="xs"
                variant="filled"
                color={dark ? "#BC474A" : '#478FD9'}
                leftSection={<IconCalendar size={16} />}
                component="a"
                aria-label={`Support me!`}
                href={'https://calendly.com/reesud6187/30min'}
                target="_blank"
                visibleFrom="xs"
            >
                Let's Chat
                <Box component="span" visibleFrom="sm">
                    ! - Calendly
                </Box>
            </Button>
            <ColorSchemeToggle />

        </>
    )
}