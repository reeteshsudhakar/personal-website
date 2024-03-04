'use client'

import { Title, Text, Anchor, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  const dark = useComputedColorScheme('dark') === 'dark';

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={dark ? { from: 'pink', to: 'yellow' } : { from: 'blue', to: 'cyan' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file.
      </Text>
    </>
  );
}
