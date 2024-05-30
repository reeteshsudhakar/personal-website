import { GetInTouch } from "@/components/ContactForm/GetInTouch";
import { Stack, Text, rem } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Reetesh Sudhakar",
    description: "A page to get in touch with me!",
};

export default function HomePage() {
    return (
        <Stack p={"xl"} gap={"xl"} pt={"5rem"}>
            <Text ta="center" size={rem(75)} c={"white"} component="span" fw={700}>
                Get in Touch
            </Text>
            <GetInTouch />
        </Stack>
    );
}
