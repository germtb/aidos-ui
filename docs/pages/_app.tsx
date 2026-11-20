import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { GeistSans } from "geist/font/sans";
import { highlightAll } from "prismjs";
import { BaseLinkComponentOverrideContext } from "../../src/BaseLink";
import { Providers } from "../../src/Providers";
import { darkTheme, lightTheme } from "../../src/jss";
import { DocsLayout } from "../components/DocsLayout";
import { DocsMDXProvider } from "../components/mdx";
import "../../src/icons";
import "./prism.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const link = useCallback((props) => <Link {...props} scroll={false} />, []);

  useEffect(() => {
    highlightAll();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Aidos UI</title>
        <meta name="description" content="A humble UI toolkit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BaseLinkComponentOverrideContext.Provider value={link}>
        <style>{`
          html { font-family: ${GeistSans.style.fontFamily}; }
          #__next { min-height: 100dvh; }
        `}</style>
        <Providers themes={{ light: lightTheme, dark: darkTheme }}>
          <DocsMDXProvider>
            <DocsLayout>
              <Component {...pageProps} />
            </DocsLayout>
          </DocsMDXProvider>
        </Providers>
      </BaseLinkComponentOverrideContext.Provider>
    </>
  );
}
