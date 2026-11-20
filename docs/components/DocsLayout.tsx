import Router, { useRouter } from "next/router";
import React, { useCallback, useState, type ReactNode } from "react";
import {
  BaseView,
  DarkModeToggle,
  IconButton,
  IconLink,
  List,
  ListLinkItem,
  Pane,
  SearchPalette,
  Sublist,
  Toolbar,
  Workspace,
  mobile,
  useRefEffect,
} from "../../src";
import { pages } from "./pages";

const normalize = (value: string) =>
  value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "");
const searchOptions = pages.flatMap((page) =>
  page.type === "link"
    ? [
        {
          value: `/${page.page}`,
          label: page.name ?? page.page,
          description: "Getting started",
        },
      ]
    : page.content.map((item) => ({
        value: `/${item.page}`,
        label: item.name ?? item.page,
        description: page.label,
      })),
);
const readingPositions = new Map<string, number>();

export function DocsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const openSearch = useCallback(() => {
    setQuery("");
    setSearchOpen(true);
  }, []);
  const shortcuts = useRefEffect(
    useCallback(() => {
      const keydown = (event: KeyboardEvent) => {
        if (
          event.defaultPrevented ||
          event.isComposing ||
          event.altKey ||
          event.shiftKey ||
          !(event.metaKey || event.ctrlKey) ||
          event.key.toLowerCase() !== "k"
        )
          return;
        event.preventDefault();
        openSearch();
      };
      window.addEventListener("keydown", keydown);
      return () => window.removeEventListener("keydown", keydown);
    }, [openSearch]),
  );
  const reader = useRefEffect(
    useCallback((element: HTMLElement) => {
      const entryKey = (url: string) => `${history.state?.key ?? ""}:${url}`;
      let entry = entryKey(Router.asPath);
      let restoring = false;
      let navigating = false;
      let frame = 0;
      const save = () => {
        navigating = true;
        readingPositions.set(entry, element.scrollTop);
      };
      const seek = (url: string, position?: number) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (position !== undefined) element.scrollTo({ top: position });
          else {
            const hash = new URL(url, location.href).hash.slice(1);
            let target: HTMLElement | null = null;
            try {
              target = hash
                ? document.getElementById(decodeURIComponent(hash))
                : null;
            } catch {
              // Ignore malformed anchors.
            }
            if (target && element.contains(target))
              target.scrollIntoView({ block: "start" });
            else element.scrollTo({ top: 0 });
          }
        });
      };
      const complete = (url: string) => {
        // A newly mounted layout has already restored the arriving entry.
        if (!navigating) return;
        navigating = false;
        entry = entryKey(url);
        seek(url, restoring ? readingPositions.get(entry) : undefined);
        restoring = false;
      };
      const cancel = () => {
        navigating = false;
        restoring = false;
      };
      Router.beforePopState(() => {
        restoring = true;
        return true;
      });
      Router.events.on("routeChangeStart", save);
      Router.events.on("hashChangeStart", save);
      Router.events.on("routeChangeComplete", complete);
      Router.events.on("hashChangeComplete", complete);
      Router.events.on("routeChangeError", cancel);
      seek(Router.asPath, readingPositions.get(entry));
      return () => {
        cancelAnimationFrame(frame);
        Router.beforePopState(() => true);
        Router.events.off("routeChangeStart", save);
        Router.events.off("hashChangeStart", save);
        Router.events.off("routeChangeComplete", complete);
        Router.events.off("hashChangeComplete", complete);
        Router.events.off("routeChangeError", cancel);
      };
    }, []),
  );

  return (
    <BaseView
      ref={shortcuts}
      data-docs-shell
      jss={[
        {
          height: "100dvh",
          padding: 12,
          display: "flex",
        },
        mobile({ padding: 8 }),
      ]}
    >
      <Workspace
        jss={{
          border: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          overflow: "visible",
        }}
        navigationTitle="Aidos UI"
        navigation={({ dismissNavigation }) => (
          <Pane
            tag="nav"
            aria-label="Documentation navigation"
            padding="medium"
            onClickCapture={(event) => {
              if (
                !event.metaKey &&
                !event.ctrlKey &&
                !event.altKey &&
                !event.shiftKey &&
                event.button === 0 &&
                (event.target as Element).closest("a[href]")
              )
                dismissNavigation();
            }}
          >
            <List
              ariaLabel="Documentation pages"
              navigation
              jss={{ flexShrink: 0 }}
            >
              {pages.map((page) =>
                page.type === "link" ? (
                  <ListLinkItem
                    key={page.page}
                    size="small"
                    href={`/${page.page}`}
                    headline={page.name ?? page.page}
                    selected={router.pathname === `/${page.page}`}
                  />
                ) : (
                  <Sublist key={page.label} label={page.label} labelBold>
                    {page.content.map((item) => (
                      <ListLinkItem
                        key={item.page}
                        size="small"
                        href={`/${item.page}`}
                        headline={item.name ?? item.page}
                        selected={router.pathname === `/${item.page}`}
                      />
                    ))}
                  </Sublist>
                ),
              )}
            </List>
          </Pane>
        )}
      >
        {({ dismissNavigation }) => (
          <>
            <Pane
              tag="main"
              aria-label="Documentation"
              ref={reader}
              padding="none"
              header={
                <Toolbar
                  variant="pane"
                  headline="Documentation"
                  headlineColor="secondary"
                  actions={
                    <>
                      <IconButton
                        icon="search"
                        bare
                        color="secondary"
                        aria-label="Search documentation"
                        aria-keyshortcuts="Meta+K Control+K"
                        title="Search documentation (⌘K / Ctrl+K)"
                        onClick={openSearch}
                      />
                      <DarkModeToggle />
                      <IconLink
                        bare
                        color="secondary"
                        aria-label="Aidos UI on GitHub"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/germtb/aidos-ui"
                        icon="github"
                      />
                    </>
                  }
                />
              }
            >
              <BaseView
                tag="article"
                data-docs-content
                jss={{
                  width: "100%",
                  maxWidth: 1160,
                  minWidth: 0,
                  flexShrink: 0,
                  marginInline: "auto",
                  padding: "32px clamp(20px, 4vw, 48px) 64px",
                  overflowX: "clip",
                  " > :is(div, pre, ul, ol, table)": { marginBlock: 16 },
                  " > :first-child": { marginTop: 0 },
                  " [id]": { scrollMarginTop: "24px" },
                }}
              >
                {children}
              </BaseView>
            </Pane>
            <SearchPalette
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
              label="Search documentation"
              placeholder="Find a component or guide…"
              query={query}
              onQueryChange={setQuery}
              filter={false}
              options={searchOptions.filter((option) =>
                normalize(
                  `${option.label} ${option.value} ${option.description}`,
                ).includes(normalize(query)),
              )}
              onSelect={(path) => {
                dismissNavigation();
                void Router.push(path);
              }}
            />
          </>
        )}
      </Workspace>
    </BaseView>
  );
}
