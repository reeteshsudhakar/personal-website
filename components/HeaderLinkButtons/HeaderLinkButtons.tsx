'use client'

import { Button, Box, useMantineColorScheme, useComputedColorScheme, ActionIcon, Tooltip, Anchor } from "@mantine/core";
import { IconBrandGithub, IconCalendar } from "@tabler/icons-react";

export function HeaderLinkButtons() {
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
                variant="light"
                color='green'
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

            <Tooltip label='Source Code' hiddenFrom="xs">
                <Anchor href={'https://www.github.com/reeteshsudhakar/personal-website'} hiddenFrom="xs">
                    <ActionIcon hiddenFrom='xs' variant="light" color='gray'>
                        <IconBrandGithub size={16} />
                    </ActionIcon>
                </Anchor>
            </Tooltip>
            <Tooltip label='Schedule Meeting - Calendly' hiddenFrom="xs">
                <Anchor href={'https://calendly.com/reesud6187/30min'} hiddenFrom="xs">
                    <ActionIcon hiddenFrom='xs' variant="light" color='green'>
                        <IconCalendar size={16} />
                    </ActionIcon>
                </Anchor>
            </Tooltip>

        </>
    )
}