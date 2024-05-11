'use client'

import { useMediaQuery } from '@mantine/hooks';
import { Card, Image, Text, Group, Anchor, Stack } from '@mantine/core';
import classes from './ArticleCard.module.css';

interface ArticleCardProps {
    source: string;
    title: string;
    imagePath: string;
    date: string;
    author: string;
    href: string;
}

export function ArticleCard() {
    const isLargeScreen = useMediaQuery('(min-width: 36em)');
    return (
        <>
            {isLargeScreen ? (
                <Anchor underline='never' target='_blank' href={''}>
                    <Card radius="md" p={0} className={classes.card} shadow={'lg'}>
                        <Group wrap="nowrap" gap={0}>
                            <Image
                                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                                height={160}
                            />
                            <div className={classes.body}>
                                <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                                    technology
                                </Text>
                                <Text c='black' className={classes.title} mt="xs" mb="md">
                                    The best laptop for Frontend engineers in 2022
                                </Text>
                                <Group wrap="nowrap" gap="xs">
                                    <Text size="xs">Elsa Typechecker</Text>
                                    <Text size="xs" c="dimmed">
                                        •
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        Feb 6th
                                    </Text>
                                </Group>
                            </div>
                        </Group>
                    </Card>
                </Anchor>

            ) : (
                <Anchor underline='never' target='_blank' href={''}>
                    <Card radius="md" p={0} className={classes.card} shadow={'lg'}>
                        <Stack gap={0}>
                            <Image
                                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                                height={160}
                            />
                            <div className={classes.body}>
                                <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                                    technology
                                </Text>
                                <Text c='black' className={classes.title} mt="xs" mb="md">
                                    The best laptop for Frontend engineers in 2022
                                </Text>
                                <Group wrap="nowrap" gap="xs">
                                    <Text size="xs">Elsa Typechecker</Text>
                                    <Text size="xs" c="dimmed">
                                        •
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        Feb 6th
                                    </Text>
                                </Group>
                            </div>
                        </Stack>
                    </Card>
                </Anchor>

            )}
        </>
    );
}

export function ArticleCardNew() {
    return (
        <Anchor underline='never' target='_blank' href={''}>
            <Card radius="md" p={0} className={classes.card} shadow={'lg'}>
                <Image
                    src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWgefHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                    height={160}
                    className={classes.image}
                />
                <div className={classes.body}>
                    <Text tt="uppercase" c="dimmed" fw={700} size="xs" className={classes.header}>
                        technology
                    </Text>
                    <Text c='black' className={classes.title}>
                        The best laptop for Frontend engineers in 2022
                    </Text>
                    <Text size="xs" className={classes.authorDate}>
                        Elsa Typechecker • Feb 6th
                    </Text>
                </div>
            </Card>
        </Anchor>
    );
}

export default ArticleCard;