import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TABLET,
  cssVar,
  darkTheme,
  desktop,
  getPadding,
  laptop,
  lightTheme,
  mobile,
  tablet,
} from "../../src/jss";
import { Providers } from "../../src/Providers";
import { BaseView } from "../../src/BaseView";
import { List } from "../../src/List";
import { ListLinkItem } from "../../src/ListLinkItem";
import { Row } from "../../src/Row";
import { useRouter } from "next/dist/client/router";
import { highlightAll } from "prismjs";
import { IconLink } from "../../src/IconLink";
import { TextInput } from "../../src/TextInput";
import { DarkModeToggle } from "../../src/DarkMode";
import { useKeyboard } from "../../src/useKeyboard";
import { Sublist } from "../../src/Sublist";
import { NavigationSplitView } from "../../src/NavigationSplitView";
import { Card } from "../../src/Card";

import "./prism.css";
import { IconButton } from "../../src/IconButton";
import { Icon } from "../../src/Icon";
import { BaseLinkComponentOverrideContext } from "../../src/BaseLink";
import { DocsMDXProvider } from "../components/mdx";
import { pages, type PageLink } from "../components/pages";

import { GeistSans } from "geist/font/sans";
import { addCollection } from "@iconify/react";
import lucideIcons from "@iconify-json/lucide/icons.json";

addCollection(lucideIcons);

const normalizeSearchText = (value: string) =>
  value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "");

const searchablePages: Array<{ page: PageLink; text: string }> = pages.flatMap(
  (element) => {
    if (element.type === "link") {
      return [
        {
          page: element,
          text: normalizeSearchText(`${element.name ?? ""} ${element.page}`),
        },
      ];
    }

    return element.content.map((page) => ({
      page,
      text: normalizeSearchText(`${page.name ?? ""} ${page.page}`),
    }));
  },
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query);
  const isQuerying = normalizedQuery.length > 0;
  const queriedPages = useMemo(
    () =>
      isQuerying
        ? searchablePages
            .filter((entry) => entry.text.includes(normalizedQuery))
            .map((entry) => entry.page)
        : [],
    [isQuerying, normalizedQuery],
  );
  const [queryIndex, setQueryIndex] = useState<number | undefined>(undefined);
  const queriedPagesRef = useRef(queriedPages);
  const queryIndexRef = useRef(queryIndex);

  const updateQuery = (value: string) => {
    const querying = normalizeSearchText(value).length > 0;
    setQuery(value);
    setQueryIndex(querying ? 0 : undefined);

    if (window.innerWidth <= TABLET) {
      setShowList(querying);
    }
  };

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
          Math.min(
            (current ?? 0) + 1,
            Math.max(queriedPagesRef.current.length - 1, 0),
          ),
        );
      },
    },
    {
      key: "J",
      onlyWhenFocused: true,
      ctrlKey: true,
      action: () => {
        setQueryIndex((current) =>
          Math.min(
            (current ?? 0) + 1,
            Math.max(queriedPagesRef.current.length - 1, 0),
          ),
        );
      },
    },
    {
      key: "Enter",
      onlyWhenFocused: true,
      action: () => {
        if (queryIndexRef.current === undefined) {
          return;
        } else if (queriedPagesRef.current.length === 0) {
          return;
        } else {
          const element = queriedPagesRef.current[queryIndexRef.current];
          if (element.type === "link") {
            window.open(`/${element.page}`, "_self");
            updateQuery("");
          }
        }
      },
    },
    {
      key: "Escape",
      onlyWhenFocused: true,
      action: () => {
        updateQuery("");
      },
    },
  ]);

  useEffect(() => {
    queriedPagesRef.current = queriedPages;
  }, [queriedPages]);

  useEffect(() => {
    queryIndexRef.current = queryIndex;
  }, [queryIndex]);

  useEffect(() => {
    highlightAll();
  });

  const link = useCallback((props) => <Link {...props} />, []);

  return (
    <>
      <Head>
        <title>Aidos UI</title>
        <meta name="description" content="A humble UI toolkit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BaseLinkComponentOverrideContext.Provider value={link}>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
          }

          #__next {
            min-height: 100dvh;
          }
        `}</style>

        <Providers themes={{ light: lightTheme, dark: darkTheme }}>
          <DocsMDXProvider>
            <NavigationSplitView
              navigationWidth="320px"
              navigationVisibleInCompact={showList}
              compactHeader={
                <Row
                  gap="medium"
                  padding="medium"
                  align="center"
                  justify="space-between"
                >
                  <IconButton
                    aria-label={showList ? "Hide list" : "Open list"}
                    icon={showList ? "x" : "menu"}
                    color="secondary"
                    onClick={() => setShowList((x) => !x)}
                    bare
                  />
                  <Row gap="medium" align="center">
                    <DarkModeToggle />
                    <IconLink
                      aria-label="github"
                      target="_blank"
                      href="https://github.com/germtb/aidos-ui"
                      icon="github"
                      color="secondary"
                      bare
                    />
                  </Row>
                </Row>
              }
              navigation={
                <Card
                  material="aurora"
                  padding="none"
                  gap="none"
                  jss={{ height: "100%", minHeight: 0, overflow: "hidden" }}
                >
                  <Row
                    gap="large"
                    padding="large"
                    align="center"
                    justify="space-between"
                  >
                    <TextInput
                      jssRoot={{ flexGrow: 1 }}
                      ref={queryInputRef}
                      role="combobox"
                      aria-haspopup="grid"
                      aria-expanded={isQuerying ? "true" : "false"}
                      aria-controls="main-list"
                      placeholder="Search docs (⌘K)"
                      value={query}
                      onValueChange={(value) => {
                        updateQuery(value);
                      }}
                      addOn={
                        <Icon icon="search" size="medium" color="secondary" />
                      }
                    />
                    <Row
                      gap="medium"
                      align="center"
                      jss={[
                        mobile({ display: "none" }),
                        tablet({ display: "none" }),
                        laptop({ display: "flex" }),
                        desktop({ display: "flex" }),
                      ]}
                    >
                      <DarkModeToggle />
                      <IconLink
                        aria-label="github"
                        target="_blank"
                        href="https://github.com/germtb/aidos-ui"
                        icon="github"
                        color="secondary"
                        bare
                      />
                    </Row>
                  </Row>
                  <List
                    id="main-list"
                    navigation={true}
                    jss={[
                      {
                        minHeight: 0,
                        overflowY: "auto",
                        paddingTop: 0,
                        paddingRight: cssVar("--spacing-m"),
                        paddingBottom: cssVar("--spacing-xl"),
                        paddingLeft: cssVar("--spacing-m"),
                      },
                    ]}
                    ariaLabel={"API"}
                  >
                    {(isQuerying ? queriedPages : pages).map(
                      (element, index) => {
                        if (element.type === "link") {
                          const page = element.page;
                          const name = element.name;

                          return (
                            <ListLinkItem
                              key={isQuerying ? `${index}-${page}` : page}
                              onClick={() => {
                                setPathname(`/${page}`);
                                updateQuery("");
                                setShowList(false);
                              }}
                              selected={
                                isQuerying
                                  ? index === queryIndex
                                  : pathname === `/${page}`
                              }
                              href={`/${page}`}
                              headline={name ?? page}
                              headlineSize={element.headlineSize}
                              headlineBold={element.headlineBold}
                            />
                          );
                        } else if (element.type === "section") {
                          return (
                            <Sublist
                              key={`section-${element.label}`}
                              label={element.label}
                              labelBold
                            >
                              {element.content.map((element) => {
                                const page = element.page;
                                return (
                                  <ListLinkItem
                                    key={page}
                                    onClick={() => {
                                      setPathname(`/${page}`);
                                      setShowList(false);
                                    }}
                                    selected={pathname === `/${page}`}
                                    href={`/${page}`}
                                    headline={element.name ?? page}
                                    headlineSize={element.headlineSize}
                                    headlineBold={element.headlineBold}
                                  />
                                );
                              })}
                            </Sublist>
                          );
                        }
                      },
                    )}
                  </List>
                </Card>
              }
            >
              <BaseView
                jss={[
                  {
                    overflow: "visible",
                    overflowX: "clip",
                    width: "100%",
                    maxWidth: "100%",
                    minWidth: 0,
                  },
                  getPadding(["large", "xlarge"]),
                  laptop({ padding: "32px 40px" }),
                  desktop({ padding: "32px 48px" }),
                ]}
              >
                <Component {...pageProps} />
              </BaseView>
            </NavigationSplitView>
          </DocsMDXProvider>
        </Providers>
      </BaseLinkComponentOverrideContext.Provider>
    </>
  );
}
