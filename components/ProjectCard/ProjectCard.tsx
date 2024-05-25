'use client'

import { useMediaQuery } from '@mantine/hooks';
import { Card, Image, Text, Group, Anchor, Stack, Tooltip, Button, Flex } from '@mantine/core';
import classes from './ProjectCard.module.css';
import { projects } from '@/utils/constants';

interface ProjectCardProps {
    title: string;
    description: string;
    date: string
    imagePath: string;
    tech: {
        icon: React.ElementType;
        name: string;
    }[];
    links?: {
        label: string;
        href: string;
        icon?: React.ElementType;
    }[];
    index: number;
}

function ProjectCard({ title, description, date, imagePath, tech, links, index }: ProjectCardProps) {
    const isLargeScreen = useMediaQuery('(min-width: 60em)');
    const placeholder = "https://placehold.co/300x300?text=" + title

    return (
        <>
            {isLargeScreen ? (
                <Card radius="xl" p={0} className={classes.card} shadow={'lg'}>
                    <Flex wrap='nowrap' direction={index % 2 == 0 ? 'row' : 'row-reverse'} p='md' align='center'>
                        <div className={classes.image}>
                            <Image
                                src={imagePath}
                                radius='xl'
                                p='md'
                                fit='contain'
                                fallbackSrc={placeholder}
                            />
                        </div>
                        <Stack className={classes.body}>
                            <Text c="black" fw={700} size="md">
                                {title}
                            </Text>
                            <Text c="dimmed" fw={700} tt='uppercase' size='xs'>
                                {date}
                            </Text>
                            <Text fw={500} c='dimmed' mt="xs" mb="xs" size='sm'>
                                {description}
                            </Text>
                            <Stack align='center' justify='center'>
                                <Group>
                                    {tech.map((t) => (
                                        <Tooltip label={t.name} transitionProps={{ transition: 'pop', duration: 300 }}>
                                            <Stack gap="xs">
                                                <t.icon size={30} />
                                            </Stack>
                                        </Tooltip>
                                    ))}
                                </Group>
                                <Group>
                                    {links?.map((link) => (
                                        <Anchor
                                            href={link.href}
                                            target='_blank'
                                        >
                                            <Button
                                                leftSection={link.icon ? <link.icon size={20} /> : null}
                                                variant='light'
                                                color='#0172AF'
                                            >
                                                {link.label}
                                            </Button>
                                        </Anchor>
                                    ))}
                                </Group>
                            </Stack>
                        </Stack>
                    </Flex>
                </Card>
            ) : (
                <Card radius="xl" p={0} className={classes.card} shadow={'lg'}>
                    <Stack>
                        <Image
                            src={imagePath}
                            p={'md'}
                            radius='xl'
                        />
                        <Stack className={classes.body}>
                            <Text c="black" fw={700} size="md">
                                {title}
                            </Text>
                            <Text c="dimmed" fw={700} tt='uppercase' size='xs'>
                                {date}
                            </Text>
                            <Text fw={500} c='dimmed' mt="xs" mb="xs" size='sm'>
                                {description}
                            </Text>
                            <Stack align='center' justify='center'>
                                <Group align='center' justify='center'>
                                    {tech.map((t) => (
                                        <Tooltip label={t.name} transitionProps={{ transition: 'pop', duration: 300 }}>
                                            <Stack gap="xs">
                                                <t.icon size={30} />
                                            </Stack>
                                        </Tooltip>
                                    ))}
                                </Group>
                                <Group align='center' justify='center'>
                                    {links?.map((link) => (
                                        <Anchor
                                            href={link.href}
                                            target='_blank'
                                        >
                                            <Button
                                                leftSection={link.icon ? <link.icon size={20} /> : null}
                                                variant='light'
                                                color='#0172AF'
                                            >
                                                {link.label}
                                            </Button>
                                        </Anchor>
                                    ))}
                                </Group>
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
            )}
        </>
    );
}

export function ProjectCardsSection() {
    return (
        <Stack pt={'md'} gap='xl'>
            {projects.map((project, index) => (
                <ProjectCard
                    title={project.title}
                    description={project.description}
                    date={project.date}
                    imagePath={project.imagePath}
                    tech={project.tech}
                    links={project.links}
                    index={index}
                />
            ))}
        </Stack>
    )
}

