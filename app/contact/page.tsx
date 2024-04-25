import { GetInTouch } from "@/components/ContactForm/GetInTouch";
import { Stack, Text, rem, Center } from "@mantine/core";

export default function HomePage() {
    return (
        <Stack p={'xl'} gap={'xl'} pt={'5rem'}>
            <Text ta='center' size={rem(75)} c={'white'} component="span" fw={700}>
                Get in Touch
            </Text>
            <GetInTouch />
        </Stack>
    );
}
