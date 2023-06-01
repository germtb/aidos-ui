import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { useCookie } from "../useCookie";

export default function Document() {
  const [darkModeEnabled] = useCookie("dark-mode", {
    initialValue: false,
  });

  return (
    <Html lang="en">
      <Head />
      <body className={darkModeEnabled ? "dark-mode" : ""}>
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
