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

export function ArticleCard({ source, title, imagePath, date, author, href }: ArticleCardProps) {
    const isLargeScreen = useMediaQuery('(min-width: 36em)');
    return (
        <>
            {isLargeScreen ? (
                <Anchor underline='never' target='_blank' href={href}>
                    <Card radius="md" p={0} className={classes.card} shadow={'lg'}>
                        <Group wrap="nowrap" gap={0}>
                            <Image
                                src={imagePath}
                                h={200}
                                w={250}
                                fallbackSrc='https://placehold.co/250x200?text=Image+Unavailable'
                            />
                            <div className={classes.body}>
                                <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                                    {source}
                                </Text>
                                <Text c='black' className={classes.title} mt="xs" mb="md">
                                    {title}
                                </Text>
                                <Group wrap="nowrap" gap="xs">
                                    <Text size="xs">{author}</Text>
                                    <Text size="xs" c="dimmed">
                                        •
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {date}
                                    </Text>
                                </Group>
                            </div>
                        </Group>
                    </Card>
                </Anchor>

            ) : (
                <Anchor underline='never' target='_blank' href={href}>
                    <Card radius="md" p={0} className={classes.card} shadow={'lg'}>
                        <Stack gap={0}>
                            <Image
                                src={imagePath}
                                height={160}
                            />
                            <div className={classes.body}>
                                <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                                    {source}
                                </Text>
                                <Text c='black' className={classes.title} mt="xs" mb="md">
                                    {title}
                                </Text>
                                <Group wrap="nowrap" gap="xs">
                                    <Text size="xs">{author}</Text>
                                    <Text size="xs" c="dimmed">
                                        •
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {date}
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

export default ArticleCard;