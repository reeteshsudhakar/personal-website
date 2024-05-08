'use client'

import AppWrapper from "@/components/AppWrapper/AppWrapper";
import { useMediaQuery } from "@mantine/hooks";

export default function HomePage() {
    const isLargeScreen = useMediaQuery('(min-width: 48em)');

    return (
        <AppWrapper>
            <>
                {isLargeScreen ? (
                    <iframe
                        src="/resume.pdf"
                        style={{ position: 'fixed', top: 0, bottom: 0, right: 0, left: 275, width: 'calc(100% - 275px)', border: 'none', margin: 0, padding: 0, overflow: 'hidden', zIndex: 999999, height: '100%' }}
                    >
                    </iframe>

                ) : (
                    <iframe
                        src="/resume.pdf"
                        style={{ position: 'fixed', top: 60, bottom: 0, right: 0, left: 0, width: '100%', border: 'none', margin: 0, padding: 0, overflow: 'hidden', zIndex: 999999, height: '100%' }}
                    >
                    </iframe>

                )}
            </>
        </AppWrapper>
    );
}
