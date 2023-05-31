import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <style>{`
          #__next {
            height: 100%;
            width: 100%;
          }
        `}</style>
      </body>
    </Html>
  );
}
