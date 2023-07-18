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
import { ListHeaderItem } from "../ListHeaderItem";
import { Roboto } from "next/font/google";
import { List } from "../List";
import { ListLinkItem } from "../ListLinkItem";
import { Row } from "../Row";
import { useRouter } from "next/dist/client/router";
import { highlightAll } from "prismjs";
import { IconLink } from "../IconLink";
import { DarkModeToggle } from "../DarkMode";

import "./prism.css";
import { IconButton } from "../IconButton";
import { Column } from "../Column";

const monospace = Roboto({ weight: "400", subsets: ["latin"] });

const pages: Array<
  | {
      type: "header";
      label: string;
    }
  | {
      type: "link";
      page: string;
      name?: string;
    }
> = [
  { type: "header", label: "CSS" },
  { type: "link", page: "css-in-js", name: "jss" },
  { type: "header", label: "Components" },
  { type: "link", page: "FlexLayout" },
  { type: "link", page: "Text" },
  { type: "link", page: "TextPairing" },
  { type: "link", page: "TextInput" },
  { type: "link", page: "Button" },
  { type: "link", page: "Icon" },
  { type: "link", page: "IconButton" },
  { type: "link", page: "List" },
  { type: "link", page: "Checkbox" },
  { type: "link", page: "Dialog" },
  { type: "link", page: "Popover" },
  { type: "link", page: "Tooltip" },
  { type: "link", page: "Badge" },
  { type: "link", page: "Calendar" },
  { type: "link", page: "ProgressBar" },
  { type: "link", page: "ProgressCircle" },
  { type: "header", label: "Hooks" },
  { type: "link", page: "useCookie" },
  { type: "link", page: "useNavigation" },
  { type: "link", page: "usePromise" },
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
                <Span>aidos-ui@2.0.17</Span>
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
            <Column
              jsStyle={{
                gridArea: "list",
                zIndex: 1,
                padding: cssVar("--spacing-m"),
                overflow: "hidden",
              }}
            >
              <List
                bare
                navigation={true}
                jsStyle={[
                  { overflow: "scroll" },
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
                <ListLinkItem
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
                {pages.map((element) => {
                  if (element.type === "link") {
                    const page = element.page;
                    return (
                      <ListLinkItem
                        key={page}
                        bare
                        onClick={() => {
                          setPathname(`/${page}`);
                          setShowList(false);
                        }}
                        selected={pathname === `/${page}`}
                        href={`/${page}`}
                        headline={element.name ?? page}
                      />
                    );
                  } else if (element.type === "header") {
                    return (
                      <ListHeaderItem
                        bare
                        headline={element.label}
                      ></ListHeaderItem>
                    );
                  } else {
                    const _: never = element;
                  }
                })}
              </List>
            </Column>
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
