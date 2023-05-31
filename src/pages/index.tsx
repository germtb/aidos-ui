import Head from "next/head";
import React, { useEffect, useState } from "react";
import { DesignBook } from "../DesignBook";
import { Providers } from "../Providers";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aidos UI</title>
        <meta name="description" content="A simple UI toolkit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Providers>
        <DesignBook />
      </Providers>
    </>
  );
}
