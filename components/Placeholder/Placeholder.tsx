"use client";

import { Title, Text, Center, Stack } from "@mantine/core";
import classes from "./Placeholder.module.css";

export default function Placeholder() {
    return (
        <Center>
            <Stack>
                <Title className={classes.title} ta="center" mt={100}>
                    Ruh{" "}
                    <Text inherit variant="gradient" component="span" gradient={{ from: "green", to: "cyan" }}>
                        Roh{" "}
                    </Text>
                    <Text inherit component="span">
                        🚧
                    </Text>
                </Title>
                <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
                    Right now, this page is a work in progress. Stay tuned for updates!
                </Text>
            </Stack>
        </Center>
    );
}
