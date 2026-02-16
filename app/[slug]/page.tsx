"use client";

import { notFound } from "next/navigation";
import redirects from "@/redirects.json";
import { useEffect, useState } from "react";

type RedirectData = {
    href: string;
    title: string;
};

type Redirects = {
    [key: string]: RedirectData;
};

const redirectsTyped: Redirects = redirects;

const ALLOWED_REDIRECT_PROTOCOLS = ["https:", "http:", "mailto:"];

function isSafeRedirect(href: string): boolean {
    try {
        const url = new URL(href, "https://dummy");
        return ALLOWED_REDIRECT_PROTOCOLS.includes(url.protocol);
    } catch {
        return false;
    }
}

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

                if (!data || !isSafeRedirect(data.href)) {
                    notFound();
                }

                setRedirectData(data);
                setIsLoading(false);
            } catch {
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
            <div className="flex flex-col items-center pt-12">
                <h1 className="p-4 text-center text-3xl font-bold text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center pt-12">
            <h1 className="p-4 text-center text-3xl font-bold text-white">Redirecting to {redirectData?.title}...</h1>
        </div>
    );
}
