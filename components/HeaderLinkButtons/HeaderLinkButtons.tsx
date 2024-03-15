'use client'

import { Button, Box, useMantineColorScheme, useComputedColorScheme, ActionIcon, Tooltip, Anchor } from "@mantine/core";
import { IconBrandGithub, IconCalendar } from "@tabler/icons-react";

export function HeaderLinkButtons() {
    return (
        <>
            {/* <Button
                size="xs"
                variant="default"
                leftSection={<IconBrandGithub size={16} />}
                component="a"
                aria-label={`View source code on GitHub`}
                href={'https://www.github.com/reeteshsudhakar/personal-website'}
                target="_blank"
                visibleFrom='md'
            >
                Source
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
                visibleFrom="md"
            >
                Let's Chat
            </Button> */}

            <Tooltip label='Source Code' hiddenFrom="s">
                <Anchor href={'https://www.github.com/reeteshsudhakar/personal-website'} hiddenFrom="s">
                    <ActionIcon hiddenFrom='s' variant="light" color='gray'>
                        <IconBrandGithub size={16} />
                    </ActionIcon>
                </Anchor>
            </Tooltip>
            <Tooltip label='Schedule Meeting - Calendly' hiddenFrom="s">
                <Anchor href={'https://calendly.com/reesud6187/30min'} hiddenFrom="s">
                    <ActionIcon hiddenFrom='s' variant="light" color='green'>
                        <IconCalendar size={16} />
                    </ActionIcon>
                </Anchor>
            </Tooltip>

        </>
    )
}