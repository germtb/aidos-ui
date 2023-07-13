import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  cssVar,
  darkTheme,
  desktop,
  getPadding,
  laptop,
  lightTheme,
  mobile,
  tablet,
} from "../jss";
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
import { IconLink } from "../IconLink";
import { DarkModeToggle } from "../DarkMode";

import "./prism.css";
import { IconButton } from "../IconButton";

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
  "css-in-js",
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
  const [showList, setShowList] = useState(false);

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
        {/* @ts-ignore */}
        <MDXProvider components={components}>
          <BaseView
            jsStyle={[
              {
                height: "100%",
                overflow: "hidden",
                display: "grid",
              },
              mobile({
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto 1fr",
                gridTemplateAreas: `
                  "header"
                  "content"
                `,
              }),
              tablet({
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto 1fr",
                gridTemplateAreas: `
                  "header"
                  "content"
                `,
              }),
              laptop({
                gridTemplateColumns: "350px 1fr",
                gridTemplateRows: "auto 1fr",
                gridTemplateAreas: `
                  "header content"
                  "list   content"
                `,
              }),
              desktop({
                gridTemplateColumns: "400px 1fr",
                gridTemplateRows: "auto 1fr",
                gridTemplateAreas: `
                  "header content"
                  "list   content"
                `,
              }),
            ]}
          >
            <Row
              jsStyle={{
                gridArea: "header",
                borderBottom: `1px solid ${cssVar("--divider")}`,
              }}
              padding="medium"
              align="center"
              justify="space-between"
            >
              <Row gap="medium" align="center">
                <DarkModeToggle />
                <IconLink
                  target="_blank"
                  href="https://github.com/germtb/aidos-ui"
                  icon="fa-github"
                  size="medium"
                  color="secondary"
                  bare
                />
              </Row>
              <Row gap="medium" align="center">
                <Span>aidos-ui@2.0.16</Span>
                <IconButton
                  jsStyle={[
                    laptop({ display: "none" }),
                    desktop({ display: "none" }),
                  ]}
                  icon={showList ? "fa-close" : "fa-bars"}
                  color="secondary"
                  onClick={() => setShowList((x) => !x)}
                  size="medium"
                  bare
                />
              </Row>
            </Row>
            <ListDivider />
            <List
              navigation={true}
              jsStyle={[
                {
                  gridArea: "list",
                  zIndex: 1,
                  overflow: "scroll",
                  background: cssVar("--primary-background"),
                  paddingTop: cssVar("--spacing-m"),
                },
                mobile({
                  position: "absolute",
                  display: showList ? "flex" : "none",
                  left: 0,
                  right: 0,
                  top: 49,
                  bottom: 0,
                }),
                tablet({
                  position: "absolute",
                  display: showList ? "flex" : "none",
                  left: 0,
                  right: 0,
                  top: 49,
                  bottom: 0,
                }),
              ]}
              ariaLabel={"API"}
            >
              <ListPressableRow
                bare
                selected={pathname === "/"}
                onClick={() => {
                  setPathname("/");
                  setShowList(false);
                }}
                href="/"
                headline={"Aidos UI"}
                headlineSize="large"
              />
              {pages.map((page) => (
                <ListPressableRow
                  key={page}
                  bare
                  onClick={() => {
                    setPathname(`/${page}`);
                    setShowList(false);
                  }}
                  selected={pathname === `/${page}`}
                  href={`/${page}`}
                  headline={page}
                />
              ))}
            </List>
            <BaseView
              jsStyle={[
                {
                  borderLeft: `1px solid ${cssVar("--divider")}`,
                  gridArea: "content",
                  overflow: "scroll",
                },
                getPadding(["large", "xlarge"]),
              ]}
            >
              <Component {...pageProps} />
            </BaseView>
          </BaseView>
        </MDXProvider>
      </Providers>
    </>
  );
}
