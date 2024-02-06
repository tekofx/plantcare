import Navbar from '@/components/NavBar';
import { ColorSchemeScript, Container, Grid, GridCol, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '../theme';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Grid>
            <GridCol span={4}>
              <Navbar />
            </GridCol>
            <GridCol>
              <Container>{children}</Container>
            </GridCol>
          </Grid>
        </MantineProvider>
      </body>
    </html>
  );
}
