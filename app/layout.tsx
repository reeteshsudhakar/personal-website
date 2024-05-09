import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import AppWrapper from '@/components/AppWrapper/AppWrapper';


export const metadata = {
  title: 'Reetesh Sudhakar',
  description: 'My personal portfolio page!',
};

export default function RootLayout({ children }: { children: any }) {
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
          <AppWrapper>
            {children}
          </AppWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
