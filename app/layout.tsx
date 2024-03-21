import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, MantineColorScheme } from '@mantine/core';
import { theme } from '../theme';
import NewAppWrapper from '@/components/AppWrapper/NewAppWrapper';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  // This could be in your _app.js or wherever you setup MantineProvider

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          <NewAppWrapper>{children}</NewAppWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
