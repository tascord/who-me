import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { MantineProvider, createEmotionCache, Loader, LoadingOverlay } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import { useEffect, useMemo, useState } from 'react';
import { Translator } from './translation';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

createEmotionCache({ key: 'mantine' });

const Wrapper = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {

    if (ready) return;
    Translator.set_locale(window.navigator.language || 'en-US').then(() => setReady(true));

  }, []);

  return ready ? <Outlet /> : <LoadingOverlay visible={true} />;
}

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ primaryColor: 'pink' }}>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          <Wrapper />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}