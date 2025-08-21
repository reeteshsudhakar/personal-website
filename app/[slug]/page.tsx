"use client";

import { notFound } from "next/navigation";
import redirects from "@/redirects.json";
import { useEffect, useState } from "react";
import { Center, Title } from "@mantine/core";

type RedirectData = {
    href: string;
    title: string;
};

type Redirects = {
    [key: string]: RedirectData;
};

const redirectsTyped: Redirects = redirects;

type RedirectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default function RedirectPage({ params }: RedirectPageProps) {
    const [redirectData, setRedirectData] = useState<RedirectData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadParams = async () => {
            try {
                const { slug } = await params;
                const data = redirectsTyped[slug];

                if (!data) {
                    notFound();
                }

                setRedirectData(data);
                setIsLoading(false);
            } catch (error) {
                notFound();
            }
        };

        loadParams();
    }, [params]);

    useEffect(() => {
        if (redirectData) {
            const timer = setTimeout(() => {
                window.location.href = redirectData.href;
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [redirectData]);

    if (isLoading) {
        return (
            <Center style={{ paddingTop: 50, flexDirection: "column" }}>
                <Title order={1} c={"white"} ta="center" p={"md"}>
                    Loading...
                </Title>
            </Center>
        );
    }

    return (
        <Center style={{ paddingTop: 50, flexDirection: "column" }}>
            <Title order={1} c={"white"} ta="center" p={"md"}>
                Redirecting to {redirectData?.title}...
            </Title>
        </Center>
    );
}
