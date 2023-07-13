import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { cssVar, darkTheme, getPadding, lightTheme } from "../jss";
import { MDXProvider } from "@mdx-js/react";
import { Providers } from "../Providers";
import { BaseView } from "../BaseView";
import { H1, H2, H3, Li, P, Span } from "../Text";
import { ListDivider } from "../ListDivider";
import { Roboto } from "next/font/google";
import { List } from "../List";
import { ListPressableRow } from "../ListPressableRow";
import { Row } from "../Row";
import { useRouter } from "next/dist/client/router";
import { highlightAll } from "prismjs";
import { Column } from "../Column";
import { IconLink } from "../IconLink";
import { DarkModeToggle } from "../DarkMode";
import { Link } from "../Link";

import "./prism.css";

const monospace = Roboto({ weight: "400", subsets: ["latin"] });

const pages = [
  "Badge",
  "Button",
  "Calendar",
  "Checkbox",
  "Dialog",
  "FlexLayout",
  "Icon",
  "IconButton",
  "jss",
  "List",
  "Popover",
  "ProgressBar",
  "ProgressCircle",
  "Text",
  "TextInput",
  "Tooltip",
  "useCookie",
  "useNavigation",
  "usePromise",
];

const components = {
  h1: (props) => (
    <H1 jsStyle={{ marginBottom: cssVar("--spacing-xl") }} {...props} />
  ),
  h2: (props) => (
    <H2
      id={props.children
        .replace(/[A-Z]/g, (m) => m.toLowerCase())
        .replace(/\s/g, "-")
        .replace(/\?/g, "")}
      jsStyle={{ marginBottom: cssVar("--spacing-l") }}
      {...props}
    />
  ),
  h3: (props) => {
    return <H3 {...props} />;
  },
  p: (props) => (
    <P jsStyle={{ marginBottom: cssVar("--spacing-m") }} {...props} />
  ),
  span: (props) => <Span {...props} />,
  li: (props) => <Li {...props} />,
  hr: () => (
    <BaseView
      jsStyle={{
        marginBottom: cssVar("--spacing-xxl"),
        marginTop: cssVar("--spacing-xxl"),
      }}
    >
      <ListDivider />
    </BaseView>
  ),
  pre: (props) => {
    return (
      <pre
        style={{ borderRadius: cssVar("--border-radius-l") }}
        className={props.children.props.className}
        tabIndex={0}
      >
        <code className={props.children.props.className}>
          {props.children.props.children}
        </code>
      </pre>
    );
  },
  code: ({ children }) => (
    <span
      className={monospace.className}
      style={{
        color: cssVar("--primary-text"),
        background: cssVar("--secondary-background"),
        borderRadius: cssVar("--border-radius-m"),
        padding: cssVar("--spacing-xs"),
        border: `1px solid ${cssVar("--divider")}`,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  ),
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [pathname, setPathname] = useState(router.pathname);

  useEffect(() => {
    highlightAll();
  });

  return (
    <>
      <Head>
        <title>Aidos UI</title>
        <meta name="description" content="A simple UI toolkit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Providers themes={{ light: lightTheme, dark: darkTheme }}>
        <MDXProvider components={components}>
          <Row jsStyle={{ height: "100%", overflow: "hidden" }}>
            <Column
              gap="medium"
              jsStyle={{
                minWidth: 400,
                borderRight: `1px solid ${cssVar("--divider")}`,
                height: "100%",
              }}
            >
              <Column>
                <Row padding="medium" align="center" justify="space-between">
                  <Row gap="medium" align="center">
                    <DarkModeToggle />
                    <IconLink
                      href="https://github.com/germtb/aidos-ui"
                      icon="fa-github"
                      size="medium"
                      color="secondary"
                      bare
                    />
                  </Row>
                  <Span>aidos-ui@2.0.13</Span>
                </Row>
                <ListDivider />
              </Column>
              <List
                navigation={true}
                jsStyle={{
                  overflow: "scroll",
                }}
                ariaLabel={"API"}
              >
                <ListPressableRow
                  bare
                  selected={pathname === "/"}
                  onClick={() => setPathname("/")}
                  href="/"
                  headline={"Aidos UI"}
                  headlineSize="large"
                />
                {pages.map((page) => (
                  <ListPressableRow
                    key={page}
                    bare
                    onClick={() => setPathname(`/${page}`)}
                    selected={pathname === `/${page}`}
                    href={`/${page}`}
                    headline={page}
                  />
                ))}
              </List>
            </Column>
            <BaseView
              jsStyle={{
                padding: getPadding(["large", "xlarge"]),
                overflow: "scroll",
              }}
            >
              <Component {...pageProps} />
            </BaseView>
          </Row>
        </MDXProvider>
      </Providers>
    </>
  );
}
