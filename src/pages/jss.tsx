import Head from "next/head";
import React, { useRef } from "react";

import { JSStyles, getBaseStyles, jss } from "../JSS";
export default function Home() {
  return (
    <>
      <Head>
        <title>JSS</title>
        <meta name="description" content="A simple UI toolkit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <JSStyles getBaseStyles={getBaseStyles} />
      </Head>
      <div
        className={jss({
          padding: 8,
          background: "red",
          [":hover"]: {
            background: "blue",
          },
        })}
      >
        Hello JSS
      </div>
      <div
        className={jss({
          padding: 8,
          background: "red",
          [":hover"]: {
            background: "blue",
          },
          [`@media (min-width: 500px)`]: {
            background: "green",
          },
        })}
      >
        Hello JSS
      </div>
    </>
  );
}
