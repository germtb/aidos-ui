import React, {
  useCallback,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { queryFocusables } from "./aria";
import { BaseView, type BaseViewProps } from "./BaseView";
import { IconButton } from "./IconButton";
import { glass } from "./glass";
import { Toolbar } from "./Toolbar";
import { toClassnames } from "./jss";
import { useRefEffect } from "./useRefEffect";

export interface WorkspaceControls {
  showNavigation: () => void;
  dismissNavigation: () => void;
}

type WorkspaceSlot = ReactNode | ((controls: WorkspaceControls) => ReactNode);

export interface WorkspaceProps extends Omit<
  BaseViewProps,
  "children" | "ref"
> {
  rail?: WorkspaceSlot;
  navigation?: WorkspaceSlot;
  navigationTitle?: string;
  navigationMaterial?: "solid" | "glass";
  navigationOpen?: boolean;
  onNavigationOpenChange?: (open: boolean) => void;
  children: WorkspaceSlot;
}

export function Workspace({
  rail,
  navigation,
  navigationTitle = "Navigation",
  navigationMaterial = "solid",
  navigationOpen,
  onNavigationOpenChange,
  children,
  jss,
  dir,
  ...props
}: WorkspaceProps) {
  const id = useId();
  const [compact, setCompact] = useState(false);
  const [intent, setIntent] = useState<"auto" | "open" | "closed">("auto");
  const measured = useRef<boolean | null>(null);
  const channel = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const channelFocused = useRef(false);
  const hasRail = Boolean(rail);
  const hasNavigation = Boolean(navigation);
  const visible =
    hasNavigation &&
    (navigationOpen ?? (intent === "open" || (intent === "auto" && !compact)));
  const docked = visible && !compact;
  const floating = visible && compact;
  const railWidth = hasRail ? 48 : 0;
  const changeNavigation = (open: boolean) => {
    if (navigationOpen === undefined) setIntent(open ? "open" : "closed");
    onNavigationOpenChange?.(open);
  };
  const hideNavigation = () => changeNavigation(false);
  const controls: WorkspaceControls = {
    showNavigation: () => {
      if (!visible) {
        returnTo.current = document.activeElement as HTMLElement;
        changeNavigation(true);
      }
    },
    dismissNavigation: () => {
      if (floating) hideNavigation();
    },
  };
  const render = (slot: WorkspaceSlot) =>
    typeof slot === "function" ? slot(controls) : slot;
  const restoreFocus = useCallback(() => {
    const target = returnTo.current;
    if (
      target?.isConnected &&
      !target.closest("[hidden], [inert]") &&
      !target.matches(":disabled") &&
      target.getClientRects().length &&
      getComputedStyle(target).visibility !== "hidden"
    )
      target.focus({ preventScroll: true });
    else toggle.current?.focus({ preventScroll: true });
  }, []);
  const measure = useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        const position = () => {
          const rect = element.getBoundingClientRect();
          const rtl =
            dir === "rtl" ||
            (dir !== "ltr" && getComputedStyle(element).direction === "rtl");
          const width = Math.max(
            0,
            Math.min(240, element.clientWidth - railWidth - 16),
          );
          const viewport = window.visualViewport;
          const viewportTop = viewport?.offsetTop ?? 0;
          const viewportHeight = viewport?.height ?? window.innerHeight;
          const height = Math.max(
            0,
            Math.min(element.clientHeight - 16, viewportHeight - 16),
          );
          const top = Math.max(
            viewportTop + 8,
            Math.min(
              rect.top + element.clientTop + 8,
              viewportTop + viewportHeight - height - 8,
            ),
          );
          element.style.setProperty("--aidos-navigation-top", `${top}px`);
          element.style.setProperty(
            "--aidos-navigation-start",
            `${(rtl ? document.documentElement.clientWidth - rect.right : rect.left) + element.clientLeft + 8}px`,
          );
          element.style.setProperty("--aidos-navigation-height", `${height}px`);
          element.style.setProperty("--aidos-navigation-width", `${width}px`);
          const next = element.clientWidth < 820 + railWidth;
          if (next === measured.current) return;
          // Keep a focused channel open; otherwise the document wins on narrow layouts.
          const focused =
            channelFocused.current ||
            Boolean(channel.current?.contains(document.activeElement));
          setIntent((current) =>
            current === "closed" ? current : next && focused ? "open" : "auto",
          );
          measured.current = next;
          setCompact(next);
        };
        position();
        const observer = new ResizeObserver(position);
        observer.observe(element);
        window.addEventListener("scroll", position, true);
        window.addEventListener("resize", position);
        window.visualViewport?.addEventListener("resize", position);
        window.visualViewport?.addEventListener("scroll", position);
        return () => {
          observer.disconnect();
          window.removeEventListener("scroll", position, true);
          window.removeEventListener("resize", position);
          window.visualViewport?.removeEventListener("resize", position);
          window.visualViewport?.removeEventListener("scroll", position);
        };
      },
      [railWidth, dir],
    ),
  );
  const mountNavigation = useRefEffect(
    useCallback(
      (element: HTMLDialogElement) => {
        const active = document.activeElement as HTMLElement;
        const hadChannelFocus =
          channelFocused.current || Boolean(channel.current?.contains(active));
        const wasModal = element.matches(":modal");
        if (element.open && wasModal !== floating) element.close();
        if (!element.open) {
          if (floating) {
            if (!hadChannelFocus)
              returnTo.current =
                active === document.body ? returnTo.current : active;
            element.showModal();
          } else element.open = true;
        }
        if (!visible && (hadChannelFocus || wasModal)) {
          restoreFocus();
          channelFocused.current = false;
        } else if (element.contains(active) && !active.closest("[hidden]")) {
          active.focus({ preventScroll: true });
        }
        return () => {
          const hadFocus =
            channelFocused.current || element.contains(document.activeElement);
          queueMicrotask(() => {
            if (element.isConnected) return;
            element.close();
            if (
              hadFocus &&
              (document.activeElement === document.body ||
                element.contains(document.activeElement))
            )
              restoreFocus();
          });
        };
      },
      [visible, floating, restoreFocus],
    ),
  );

  const navigationToggle = hasNavigation && (
    <IconButton
      ref={toggle}
      bare
      color="secondary"
      icon={visible ? "panel-left-close" : "panel-left-open"}
      aria-label={visible ? "Hide navigation" : "Show navigation"}
      aria-expanded={visible}
      aria-controls={id}
      onClick={() => (visible ? hideNavigation() : controls.showNavigation())}
    />
  );

  return (
    <BaseView
      {...props}
      dir={dir}
      ref={measure}
      data-aidos-workspace
      data-mode={docked ? "docked" : floating ? "overlay" : "hidden"}
      jss={[
        {
          position: "relative",
          isolation: "isolate",
          flex: 1,
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
          border: "1px solid var(--divider)",
          borderRadius: 16,
          backgroundColor: "var(--secondary-background)",
        },
        jss,
      ]}
    >
      {floating && (
        <BaseView
          aria-hidden
          jss={{
            position: "absolute",
            inset: 0,
            insetInlineStart: 8 + railWidth,
            background: "rgb(0 0 0 / 6%)",
            zIndex: 1,
          }}
        />
      )}
      {(hasRail || hasNavigation) && (
        <dialog
          ref={mountNavigation}
          data-aidos-workspace-navigation-layer
          role={floating ? "dialog" : "presentation"}
          aria-modal={floating || undefined}
          aria-labelledby={floating ? `${id}-title` : undefined}
          onCancel={(event) => {
            if (event.target === event.currentTarget) {
              event.preventDefault();
              hideNavigation();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape" && event.nativeEvent.isComposing)
              event.preventDefault();
            if (
              !floating ||
              event.defaultPrevented ||
              event.nativeEvent.isComposing ||
              (event.target as HTMLElement).closest("dialog:modal") !==
                event.currentTarget
            )
              return;
            if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              hideNavigation();
              return;
            }
            if (
              event.key !== "Tab" ||
              event.altKey ||
              event.ctrlKey ||
              event.metaKey
            )
              return;
            const items = queryFocusables(event.currentTarget).filter(
              (item) => item.tabIndex >= 0,
            );
            const first = items[0],
              last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
          onPointerDown={(event) => {
            if (!floating || event.target !== event.currentTarget) return;
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            ) {
              event.preventDefault();
              hideNavigation();
            }
          }}
          className={toClassnames([
            {
              position: "absolute",
              zIndex: 2,
              inset: "8px auto 8px",
              insetInlineStart: 8,
              width: visible
                ? `calc(${railWidth}px + var(--aidos-navigation-width, 240px))`
                : 48,
              maxWidth: "none",
              maxHeight: "none",
              height: "auto",
              margin: 0,
              padding: 0,
              display: "block",
              overflow: "visible",
              border: 0,
              color: "var(--primary-text)",
              backgroundColor: "transparent",
              pointerEvents: "none",
              "::backdrop": { background: "transparent" },
            },
            floating && {
              position: "fixed",
              inset: "auto",
              top: "var(--aidos-navigation-top)",
              insetInlineStart: "var(--aidos-navigation-start)",
              height: "var(--aidos-navigation-height)",
              pointerEvents: "auto",
            },
          ])}
        >
          {hasRail ? (
            <BaseView
              data-aidos-workspace-rail
              jss={{
                position: "absolute",
                insetBlock: 0,
                insetInlineStart: 0,
                width: 48,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "auto",
              }}
            >
              {hasNavigation && (
                <BaseView
                  jss={{
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {navigationToggle}
                </BaseView>
              )}
              <BaseView
                tabIndex={-1}
                jss={{
                  flex: 1,
                  minHeight: 0,
                  width: "100%",
                  overflowY: "auto",
                  outline: "none",
                }}
              >
                {render(rail)}
              </BaseView>
            </BaseView>
          ) : (
            <BaseView
              jss={{
                position: "absolute",
                zIndex: 1,
                top: 10,
                insetInlineStart: 8,
                pointerEvents: "auto",
              }}
            >
              {navigationToggle}
            </BaseView>
          )}
          {hasNavigation && (
            <BaseView
              ref={channel}
              tag="aside"
              id={id}
              data-aidos-workspace-navigation
              hidden={!visible}
              aria-labelledby={`${id}-title`}
              onFocusCapture={() => {
                channelFocused.current = true;
              }}
              onBlurCapture={(event) => {
                if (
                  event.relatedTarget instanceof Node &&
                  !event.currentTarget.contains(event.relatedTarget)
                )
                  channelFocused.current = false;
              }}
              jss={[
                navigationMaterial === "glass" && visible && glass(),
                {
                  position: "absolute",
                  insetBlock: 0,
                  insetInlineStart: railWidth,
                  width: "var(--aidos-navigation-width, 240px)",
                  display: visible ? "flex" : "none",
                  flexDirection: "column",
                  minHeight: 0,
                  overflow: "hidden",
                  pointerEvents: "auto",
                  border:
                    navigationMaterial === "glass"
                      ? "1px solid transparent"
                      : "1px solid color-mix(in srgb, var(--divider) 65%, transparent)",
                  borderRadius: 12,
                  backgroundColor:
                    navigationMaterial === "glass"
                      ? undefined
                      : floating
                        ? "var(--overlay-background)"
                        : "var(--primary-background)",
                  boxShadow:
                    navigationMaterial === "glass"
                      ? undefined
                      : floating
                        ? "var(--shadow-lg)"
                        : "var(--shadow-md)",
                },
              ]}
            >
              <Toolbar
                data-aidos-workspace-navigation-header
                variant="pane"
                headline={<span id={`${id}-title`}>{navigationTitle}</span>}
                headlineBold
                padding="medium"
                jss={{
                  backgroundColor: "transparent",
                  paddingInlineStart: hasRail ? 16 : 44,
                }}
              />
              {render(navigation)}
            </BaseView>
          )}
        </dialog>
      )}
      {/* The document card extends beneath the channel without covering its content. */}
      <BaseView
        data-aidos-workspace-content
        style={
          {
            "--aidos-header-leading-inset":
              hasNavigation && !railWidth && !docked ? "32px" : "0px",
          } as React.CSSProperties
        }
        jss={{
          position: "absolute",
          inset: 8,
          insetInlineStart: 8 + railWidth + (docked ? 232 : 0),
          paddingInlineStart: docked ? 16 : 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: "var(--overlay-background)",
          boxShadow:
            "0 0 0 1px color-mix(in srgb, var(--divider) 55%, transparent), var(--shadow-md)",
          transition:
            "inset-inline-start 180ms cubic-bezier(0.2, 0, 0, 1), padding-inline-start 180ms cubic-bezier(0.2, 0, 0, 1)",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        {render(children)}
      </BaseView>
    </BaseView>
  );
}
