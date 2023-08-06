import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
} from "../jss";
import { Providers } from "../Providers";
import { BaseView } from "../BaseView";
import { ListDivider } from "../ListDivider";
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
import { BaseLinkComponentOverrideContext } from "../BaseLink";
import { DocsMDXProvider, labelToID } from "../docs/mdx";
import { Pipeline, dot, pipeline } from "@xenova/transformers";
import { pages } from "../docs/pages";

const transformers = import("@xenova/transformers");
const searchIndex = import("../docs/searchIndex").then(
  (module) => module.index
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");
  const [queriedPages, setQueriedPages] = useState<Array<PageLink>>([]);
  const queriedPagesRef = useRef<Array<PageLink>>([]);
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
          Math.min((current ?? 0) + 1, queriedPagesRef.current.length - 1)
        );
      },
    },
    {
      key: "J",
      onlyWhenFocused: true,
      ctrlKey: true,
      action: () => {
        setQueryIndex((current) =>
          Math.min((current ?? 0) + 1, queriedPagesRef.current.length - 1)
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
            setQuery("");
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

  const isQuerying = sanetisedQuery.length > 0;

  useEffect(() => {
    if (isQuerying) {
      setQueryIndex(0);
      if (window.innerWidth <= TABLET) {
        setShowList(true);
      }
    } else {
      setQueryIndex(undefined);
      if (window.innerWidth <= TABLET) {
        setShowList(false);
      }
    }
  }, [isQuerying]);

  useEffect(() => {
    queryIndexRef.current = queryIndex;
  }, [queryIndex]);

  const stateRef = useRef<string | null>(null);

  useEffect(() => {
    if (sanetisedQuery.length === 0) {
      return;
    }

    const effectId = self.crypto.randomUUID();
    stateRef.current = effectId;

    const isInvalid = () => effectId !== stateRef.current;

    async function run() {
      const data = await searchIndex;

      if (isInvalid()) {
        return;
      }

      const generateEmbeddings = await loadModel();

      if (isInvalid()) {
        return;
      }

      const queryEmbeddings = await generateEmbeddings(query, {
        normalize: true,
        pooling: "mean",
      }).then((embedding) => embedding.data);

      if (isInvalid()) {
        return;
      }

      let seen = new Set();

      queriedPagesRef.current = data.index
        .map((element) => {
          return {
            ...element,
            dot: dot(queryEmbeddings, element.embedding),
          };
        })
        .filter((element) => element.dot > 0.2)
        .sort((a, b) => b.dot - a.dot)
        .slice(0, 5)
        .filter((result) => {
          if (seen.has(result.filename)) {
            return false;
          } else {
            seen.add(result.filename);
            return true;
          }
        })
        .map((result) => {
          const heading =
            result.headingDepth > 1 && result.heading.length > 0
              ? labelToID(result.heading)
              : null;
          const page = result.filename === "index" ? "" : result.filename;
          return {
            type: "link",
            name: result.filename,
            page: heading ? `${page}#${heading}` : page,
          };
        });
      setQueriedPages(queriedPagesRef.current.slice());
    }

    run();
  }, [sanetisedQuery]);

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
        <Providers themes={{ light: lightTheme, dark: darkTheme }}>
          <DocsMDXProvider>
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
                  role="combobox"
                  aria-haspopup="grid"
                  aria-expanded={isQuerying ? "true" : "false"}
                  aria-controls=""
                  placeholder="Semantic search (⌘K)"
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
                    href="https://github.com/germtb/aidos-ui"
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
                  {(isQuerying ? queriedPages : pages).map((element, index) => {
                    if (element.type === "link") {
                      const page = element.page;
                      const name = element.name;

                      return (
                        <ListLinkItem
                          key={isQuerying ? `${index}-${page}` : page}
                          onClick={() => {
                            setPathname(`/${page}`);
                            setQuery("");
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
          </DocsMDXProvider>
        </Providers>
      </BaseLinkComponentOverrideContext.Provider>
    </>
  );
}

let modelPromise: Promise<Pipeline> | null = null;

const loadModel: () => Promise<Pipeline> = async () => {
  const { pipeline } = await transformers;
  if (modelPromise == null) {
    modelPromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  const generateEmbeddings = await modelPromise;

  return generateEmbeddings;
};
