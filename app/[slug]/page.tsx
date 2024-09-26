"use client";

import { notFound } from "next/navigation";
import redirects from "../../redirects.json";
import { useEffect } from "react";
import { Center, Title, Text } from "@mantine/core";

// Define a simplified type for the redirect data
type RedirectData = {
    href: string;
    title: string;
};

// Type for the redirects JSON structure
type Redirects = {
    [key: string]: RedirectData;
};

// Cast redirects as the proper type
const redirectsTyped: Redirects = redirects;

type RedirectPageProps = {
    params: {
        slug: string;
    };
};

export default function RedirectPage({ params }: RedirectPageProps) {
    const { slug } = params;

    const redirectData = redirectsTyped[slug];

    if (!redirectData) {
        // Handle unknown slugs
        notFound();
    }

    useEffect(() => {
        // Redirect after a short delay (e.g., 1 second) to show the message
        const timer = setTimeout(() => {
            window.location.href = redirectData.href;
        }, 1000);

        return () => clearTimeout(timer);
    }, [redirectData.href]);

    return (
        <Center style={{ paddingTop: 50, flexDirection: "column" }}>
            <Title order={1} c={"white"} ta="center" p={"md"}>
                Redirecting to {redirectData.title}...
            </Title>
        </Center>
    );
}
