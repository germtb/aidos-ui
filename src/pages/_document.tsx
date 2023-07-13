import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { useCookie } from "../useCookie";
import { JSServerStyles } from "../jss";

export default function Document() {
  const [darkModeEnabled] = useCookie("dark-mode", {
    initialValue: false,
    loadingValue: false,
  });

  return (
    <Html lang="en">
      <Head>
        <JSServerStyles />
      </Head>
      <body className={darkModeEnabled ? "dark-mode" : ""}>
        <Main />
        <NextScript />
        <style>{`
          #__next {
            height: 100%;
            width: 100%;
            overflow-y: auto;
          }
        `}</style>
      </body>
    </Html>
  );
}
