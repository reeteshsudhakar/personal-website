'use client'

import { Title, Text, Anchor, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import classes from './Welcome.module.css';
import { useState, useEffect } from 'react';


interface WelcomeProps {
  pageTitle: string;
}

export function Welcome(props: WelcomeProps) {

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Hi, I'm{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'green', to: 'cyan' }}>
          Reetesh
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        {/* This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file. */}

        Right now, we're on the {props.pageTitle} page.
      </Text>
    </>
  );
}
