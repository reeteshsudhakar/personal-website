"use client";

import { Center, Loader, Container, Title, Group, Badge, Anchor, Text } from "@mantine/core";
import { useState, useEffect } from "react";

type Quote = {
    body: string;
    author: string;
    url: string;
    tags: string[];
};

const QuoteComponent = () => {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch("/api/quotes");
                if (!response.ok) {
                    throw new Error("Failed to fetch quote");
                }
                const data: Quote = await response.json();
                setQuote(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    if (loading) {
        return (
            <Center style={{ height: "100vh" }}>
                <Loader size="xl" />
            </Center>
        );
    }

    if (error || !quote) {
        return (
            <Center style={{ height: "100vh" }}>
                <Text>Failed to load the quote. Please try again.</Text>
            </Center>
        );
    }

    return (
        <Center style={{ height: "100vh" }}>
            <Container size="md" style={{ textAlign: "center" }}>
                <Title order={1} style={{ fontSize: "2rem", marginBottom: "1rem", color: "white" }}>
                    {quote.body}
                </Title>
                <Text fw={700} style={{ marginBottom: "1rem" }}>
                    {quote.author}
                </Text>

                {quote.tags.length > 0 && (
                    <Group p="xs" align="center" justify="center" style={{ marginBottom: "1rem" }}>
                        {quote.tags.map((tag, index) => (
                            <Badge key={index} color="#50B384" variant="filled">
                                {tag}
                            </Badge>
                        ))}
                    </Group>
                )}

                <Anchor href={quote.url} target="_blank" rel="noopener noreferrer">
                    View Source
                </Anchor>
            </Container>
        </Center>
    );
};

export default QuoteComponent;
