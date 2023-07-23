import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  Size,
  TABLET,
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
import { TextInput } from "../TextInput";
import { DarkModeToggle } from "../DarkMode";
import { useKeyboard } from "../useKeyboard";
import { Sublist } from "../Sublist";

import "./prism.css";
import { IconButton } from "../IconButton";
import { Column } from "../Column";
import { Icon } from "../Icon";
import { BaseLink, BaseLinkComponentOverrideContext } from "../BaseLink";

const monospace = Roboto({ weight: "400", subsets: ["latin"] });

type PageLink = {
  type: "link";
  page: string;
  name?: string;
  headlineSize?: Size;
  headlineBold?: boolean;
};

type Page =
  | PageLink
  | {
      type: "section";
      label: string;
      content: Array<PageLink>;
    };

const pages: Array<Page> = [
  {
    type: "link",
    page: "",
    name: "Simple UI",
    headlineSize: "large",
    headlineBold: true,
  },
  {
    type: "section",
    label: "CSS",
    content: [{ type: "link", page: "css-in-js", name: "jss" }],
  },
  {
    type: "section",
    label: "Primary components",
    content: [
      { type: "link", page: "FlexLayout" },
      { type: "link", page: "Text" },
      { type: "link", page: "TextPairing" },
      { type: "link", page: "Icon" },
    ],
  },
  {
    type: "section",
    label: "Buttons and links",
    content: [
      { type: "link", page: "Button" },
      { type: "link", page: "Link" },
      { type: "link", page: "IconButton" },
    ],
  },
  {
    type: "section",
    label: "Inputs",
    content: [
      { type: "link", page: "TextInput" },
      { type: "link", page: "RangeInput" },
      { type: "link", page: "TimeInput" },
      { type: "link", page: "Checkbox" },
    ],
  },
  {
    type: "section",
    label: "List",
    content: [
      { type: "link", page: "List" },
      { type: "link", page: "ListHeader" },
      { type: "link", page: "navigation", name: "List navigation" },
    ],
  },
  {
    type: "section",
    label: "Modals",
    content: [
      { type: "link", page: "Dialog" },
      { type: "link", page: "Popover" },
      { type: "link", page: "Tooltip" },
    ],
  },
  {
    type: "section",
    label: "Visual indicators",
    content: [
      { type: "link", page: "Badge" },
      { type: "link", page: "ProgressBar" },
      { type: "link", page: "ProgressCircle" },
    ],
  },
  {
    type: "section",
    label: "Complex components",
    content: [
      { type: "link", page: "Tabs" },
      { type: "link", page: "Calendar" },
    ],
  },
  {
    type: "section",
    label: "Hooks",
    content: [
      { type: "link", page: "useCookie" },
      { type: "link", page: "useNavigation" },
      { type: "link", page: "useKeyboard" },
      { type: "link", page: "useRefEffect" },
      { type: "link", page: "usePromise" },
    ],
  },
  {
    type: "section",
    label: "Utils",
    content: [{ type: "link", page: "Hashing" }],
  },
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
  li: (props) => (
    <Li jsStyle={{ marginBottom: cssVar("--spacing-s") }} {...props} />
  ),
  a: (props) => {
    return (
      <BaseLink
        bare
        color="positive"
        jsStyle={{
          display: "inline-block",
          paddingBottom: cssVar("--spacing-s"),
          paddingTop: cssVar("--spacing-s"),
        }}
        href={props.href}
      >
        {props.children}
      </BaseLink>
    );
  },
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
        backgroundColor: cssVar("--secondary-background"),
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
  const [query, setQuery] = useState("");
  const filteredPagesRef = useRef<Array<Page>>([]);
  const queryIndexRef = useRef<void | number>(undefined);
  const queryInputRef = useKeyboard<HTMLInputElement>([
    {
      key: "K",
      metaKey: true,
      action: (root) => root.focus(),
    },
    {
      key: "ArrowUp",
      onlyWhenFocused: true,
      action: () => {
        setQueryIndex((current) => Math.max((current ?? 0) - 1, 0));
      },
    },
    {
      key: "K",
      ctrlKey: true,
      onlyWhenFocused: true,
      action: () => {
        setQueryIndex((current) => Math.max((current ?? 0) - 1, 0));
      },
    },
    {
      key: "ArrowDown",
      onlyWhenFocused: true,
      action: () => {
        setQueryIndex((current) =>
          Math.min((current ?? 0) + 1, filteredPagesRef.current.length - 1)
        );
      },
    },
    {
      key: "J",
      onlyWhenFocused: true,
      ctrlKey: true,
      action: () => {
        setQueryIndex((current) =>
          Math.min((current ?? 0) + 1, filteredPagesRef.current.length - 1)
        );
      },
    },
    {
      key: "Enter",
      onlyWhenFocused: true,
      action: () => {
        if (queryIndexRef.current === undefined) {
          return;
        } else {
          const element = filteredPagesRef.current[queryIndexRef.current];
          if (element.type === "link") {
            window.open(`/${element.page}`, "_self");
          }
        }
      },
    },
    {
      key: "Escape",
      onlyWhenFocused: true,
      action: () => {
        setQuery("");
      },
    },
  ]);
  const [queryIndex, setQueryIndex] = useState<void | number>(undefined);

  const sanetisedQuery = query
    .replace(/[^a-zA-Z]+/g, "")
    .trim()
    .toLowerCase();

  useEffect(() => {
    if (sanetisedQuery.length === 0) {
      setQueryIndex(undefined);
      if (window.innerWidth <= TABLET) {
        setShowList(false);
      }
    } else {
      setQueryIndex(0);
      if (window.innerWidth <= TABLET) {
        setShowList(true);
      }
    }
  }, [sanetisedQuery]);

  useEffect(() => {
    queryIndexRef.current = queryIndex;
  }, [queryIndex]);

  filteredPagesRef.current =
    sanetisedQuery.length > 0
      ? pages
          .flatMap((element) =>
            element.type === "section" ? element.content : element
          )
          .filter((element) => {
            return (
              element.page.toLowerCase().includes(sanetisedQuery) ||
              element?.name?.toLowerCase()?.includes(sanetisedQuery)
            );
          })
      : pages;

  useEffect(() => {
    highlightAll();
  });

  return (
    <>
      <Head>
        <title>Simple UI</title>
        <meta name="description" content="A simple UI toolkit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BaseLinkComponentOverrideContext.Provider value={Link}>
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
                gap="medium"
                padding="medium"
                align="center"
                justify="space-between"
              >
                <TextInput
                  rootJSStyle={{ flexGrow: 1 }}
                  ref={queryInputRef}
                  placeholder="Search (⌘K)"
                  value={query}
                  onValueChange={(value) => {
                    setQuery(value);
                  }}
                  addOn={
                    <Icon icon="fa-search" size="medium" color="secondary" />
                  }
                />
                <Row gap="medium" align="center">
                  <DarkModeToggle />
                  <IconLink
                    aria-label="github"
                    target="_blank"
                    href="https://github.com/germtb/simple-ui"
                    icon="fa-github"
                    size="medium"
                    color="secondary"
                    bare
                  />
                  <IconButton
                    aria-label={showList ? "Hide list" : "Open list"}
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
                jsStyle={[
                  {
                    gridArea: "list",
                    zIndex: 1,
                    padding: cssVar("--spacing-m"),
                    overflow: "hidden",
                    backgroundColor: cssVar("--primary-background"),
                  },
                  mobile({
                    position: "absolute",
                    display: showList ? "flex" : "none",
                    left: 0,
                    right: 0,
                    top: 59,
                    bottom: 0,
                  }),
                  tablet({
                    position: "absolute",
                    display: showList ? "flex" : "none",
                    left: 0,
                    right: 0,
                    top: 59,
                    bottom: 0,
                  }),
                ]}
              >
                <List
                  bare
                  id="main-list"
                  navigation={true}
                  jsStyle={[{ overflow: "scroll" }]}
                  ariaLabel={"API"}
                >
                  {(filteredPagesRef.current.length > 0
                    ? filteredPagesRef.current
                    : pages
                  ).map((element, index) => {
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
                          selected={
                            sanetisedQuery.length > 0
                              ? index === queryIndex
                              : pathname === `/${page}`
                          }
                          href={`/${page}`}
                          headline={element.name ?? page}
                          headlineSize={element.headlineSize}
                          headlineBold={element.headlineBold}
                        />
                      );
                    } else if (element.type === "section") {
                      return (
                        <Sublist
                          key={`section-${element.label}`}
                          label={element.label}
                          bare
                        >
                          {element.content.map((element) => {
                            const page = element.page;
                            return (
                              <ListLinkItem
                                key={page}
                                bare
                                onClick={() => {
                                  setPathname(`/${page}`);
                                  setShowList(false);
                                }}
                                selected={
                                  sanetisedQuery.length > 0
                                    ? index === queryIndex
                                    : pathname === `/${page}`
                                }
                                href={`/${page}`}
                                headline={element.name ?? page}
                                headlineSize={element.headlineSize}
                                headlineBold={element.headlineBold}
                              />
                            );
                          })}
                        </Sublist>
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
      </BaseLinkComponentOverrideContext.Provider>
    </>
  );
}
