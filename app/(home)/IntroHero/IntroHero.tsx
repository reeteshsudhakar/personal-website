'use client'

import { Text, Center, Stack, Overlay } from '@mantine/core';
import classes from './IntroHero.module.css';
import { useState, useEffect } from 'react';

export function IntroHero() {
    const [overlayOpacity, setOverlayOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = window.innerHeight;
            const currentScroll = window.pageYOffset;
            const opacity = currentScroll / maxScroll;
            setOverlayOpacity(Math.min(opacity, 0.65)); // Cap opacity at 0.65
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Center className={classes.wrapper}>

            {/* <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
                transition: 'background-color 0.5s ease'
            }}></div> */}

            <Overlay opacity={overlayOpacity} color='#000' />

            <Stack align='center' justify='center'>
                <Text
                    className={classes.title}
                >
                    Hi! I'm Reetesh.
                </Text>
                <Text
                    c='#FFFFFF'
                    p={'sm'}
                    ta='center'
                >
                    I'm a M.S. Computer Science student at Georgia Tech! I'm passionate about finance, technology, and music.
                    Scroll to learn more ⬇️
                </Text>
            </Stack>

        </Center>
    );
}