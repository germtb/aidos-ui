import React, {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BaseView } from "./BaseView";
import { IconButton } from "./IconButton";
import { Row } from "./Row";
import { Text } from "./Text";
import { cssVar, type JSS } from "./jss";
import { useRefEffect } from "./useRefEffect";

export interface AdaptiveSplitViewControls {
  panelToggle: ReactNode;
  showPanel: () => void;
}

export interface AdaptiveSplitViewProps {
  panelTitle: string;
  panel: ReactNode;
  panelHeader?: ReactNode;
  showPanelCloseButton?: boolean;
  panelWidth?: number | `${number}%`;
  minContentWidth?: number;
  transitionKey?: string | number;
  children: ReactNode | ((controls: AdaptiveSplitViewControls) => ReactNode);
  header?: (controls: AdaptiveSplitViewControls) => ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  jss?: JSS;
}

const column: JSS = {
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
};

export function AdaptiveSplitView({
  panelTitle,
  panel: content,
  panelHeader,
  showPanelCloseButton = true,
  panelWidth = 320,
  minContentWidth = 560,
  transitionKey,
  children,
  header,
  open,
  onOpenChange,
  jss,
}: AdaptiveSplitViewProps) {
  const id = useId();
  const previousTransitionKey = useRef(transitionKey);
  const animate = previousTransitionKey.current === transitionKey;
  useLayoutEffect(() => {
    previousTransitionKey.current = transitionKey;
  }, [transitionKey]);
  const [intent, setIntent] = useState<"auto" | "open" | "closed">("auto");
  const [compact, setCompact] = useState(false);
  const measuredCompact = useRef<boolean | null>(null);
  const panel = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const lastOutsideFocus = useRef<HTMLElement | null>(null);
  const panelFocused = useRef(false);
  const pendingFocus = useRef<"enter" | "return" | null>(null);
  const previous = useRef({
    visible: false,
    takeover: false,
    open,
    mounted: false,
  });
  const visible =
    open ?? (intent === "open" || (intent === "auto" && !compact));
  const takeover = visible && compact;

  const measure = useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        const update = () => {
          const width =
            typeof panelWidth === "number"
              ? panelWidth
              : (element.clientWidth * parseFloat(panelWidth)) / 100;
          const next = element.clientWidth < width + minContentWidth;
          if (next === measuredCompact.current) return;
          if (measuredCompact.current !== null && next) {
            const focused =
              panelFocused.current ||
              Boolean(panel.current?.contains(document.activeElement));
            setIntent((current) =>
              current === "closed" ? current : focused ? "open" : "auto",
            );
          }
          if (
            next &&
            open === true &&
            element
              .querySelector("[data-aidos-split-content]")
              ?.contains(document.activeElement)
          ) {
            returnTo.current = document.activeElement as HTMLElement;
            pendingFocus.current = "enter";
          }
          measuredCompact.current = next;
          setCompact(next);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
      },
      [open, panelWidth, minContentWidth],
    ),
  );

  const restoreFocus = useCallback(() => {
    const target = returnTo.current;
    if (
      target?.isConnected &&
      !target.matches(":disabled") &&
      !target.closest("[hidden], [inert]") &&
      target.getClientRects().length &&
      getComputedStyle(target).visibility !== "hidden"
    ) {
      target.focus({ preventScroll: true });
    } else {
      toggle.current?.focus({ preventScroll: true });
    }
  }, []);

  const mountPanel = useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        panel.current = element;
        element.inert = !visible;
        const prior = previous.current;
        if (
          visible &&
          ((pendingFocus.current === "enter" &&
            (!prior.visible || takeover !== prior.takeover)) ||
            (prior.mounted && open === true && prior.open !== true))
        ) {
          if (pendingFocus.current !== "enter") {
            const active = document.activeElement;
            returnTo.current =
              active instanceof HTMLElement && active !== document.body
                ? active
                : lastOutsideFocus.current;
          }
          (close.current ?? panel.current)?.focus({ preventScroll: true });
        } else if (
          !visible &&
          prior.visible &&
          (pendingFocus.current === "return" || panelFocused.current)
        ) {
          restoreFocus();
          panelFocused.current = false;
        }
        pendingFocus.current = null;
        previous.current = { visible, takeover, open, mounted: true };
        return () => {
          panel.current = null;
          const hadFocus = panelFocused.current;
          queueMicrotask(() => {
            if (
              !element.isConnected &&
              hadFocus &&
              (document.activeElement === document.body ||
                element.contains(document.activeElement))
            )
              restoreFocus();
          });
        };
      },
      [visible, takeover, open, restoreFocus],
    ),
  );

  const changeOpen = (next: boolean) => {
    if (next) {
      returnTo.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      if (visible)
        (close.current ?? panel.current)?.focus({ preventScroll: true });
      else pendingFocus.current = "enter";
    } else {
      pendingFocus.current = panelFocused.current ? "return" : null;
    }
    if (open === undefined) setIntent(next ? "open" : "closed");
    onOpenChange?.(next);
  };
  const controls: AdaptiveSplitViewControls = {
    showPanel: () => changeOpen(true),
    panelToggle: (
      <IconButton
        ref={toggle}
        bare
        color="secondary"
        icon={visible ? "panel-right-close" : "panel-right-open"}
        aria-label={`${visible ? "Hide" : "Show"} ${panelTitle}`}
        aria-expanded={visible}
        aria-controls={id}
        onClick={() => changeOpen(!visible)}
      />
    ),
  };

  return (
    <BaseView
      ref={measure}
      data-aidos-adaptive-split-view
      data-mode={takeover ? "takeover" : visible ? "split" : "content"}
      onFocusCapture={(event) => {
        if (!panel.current?.contains(event.target as Node))
          lastOutsideFocus.current = event.target as HTMLElement;
      }}
      jss={[
        column,
        { height: "100%", backgroundColor: cssVar("--overlay-background") },
        jss,
      ]}
    >
      {header ? (
        header(controls)
      ) : (
        <Row
          align="center"
          justify="flex-end"
          jss={{
            height: 48,
            flexShrink: 0,
            paddingInline: 12,
            backgroundColor: "inherit",
          }}
        >
          {controls.panelToggle}
        </Row>
      )}
      <BaseView
        jss={{
          display: "grid",
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "inherit",
          gridTemplateColumns: compact
            ? "minmax(0, 1fr)"
            : `minmax(0, 1fr) ${visible ? (typeof panelWidth === "number" ? `${panelWidth}px` : panelWidth) : "0px"}`,
          transition: animate
            ? "grid-template-columns 180ms cubic-bezier(0.2, 0, 0, 1)"
            : "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        <BaseView
          data-aidos-split-content
          hidden={takeover}
          tabIndex={-1}
          jss={[
            column,
            {
              overflow: "auto",
              overscrollBehavior: "contain",
              outline: "none",
            },
            takeover && { display: "none" },
          ]}
        >
          {typeof children === "function" ? children(controls) : children}
        </BaseView>
        <BaseView
          ref={mountPanel}
          tag="aside"
          id={id}
          aria-label={panelTitle}
          tabIndex={-1}
          aria-hidden={!visible || undefined}
          onFocusCapture={() => {
            panelFocused.current = true;
          }}
          onBlurCapture={(event) => {
            if (
              event.relatedTarget instanceof Node &&
              !event.currentTarget.contains(event.relatedTarget)
            )
              panelFocused.current = false;
          }}
          onKeyDown={(event) => {
            if (
              event.key === "Escape" &&
              !event.defaultPrevented &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              event.stopPropagation();
              changeOpen(false);
            }
          }}
          jss={[
            column,
            !compact && {
              borderInlineStart: `1px solid ${cssVar("--divider")}`,
            },
            {
              width: "100%",
              outline: "none",
              boxSizing: "border-box",
              overflow: "hidden",
              backgroundColor: "inherit",
              opacity: visible ? 1 : 0,
              visibility: visible ? "visible" : "hidden",
              transform: compact && !visible ? "translateX(16px)" : "none",
              transition: animate
                ? `opacity 180ms ease, transform 180ms cubic-bezier(0.2, 0, 0, 1), visibility 0s ${visible ? "0s" : "180ms"}`
                : "none",
              "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            },
            compact && {
              position: "absolute",
              inset: 0,
              ":dir(rtl)": {
                transform: visible ? "none" : "translateX(-16px)",
              },
            },
          ]}
        >
          <Row
            data-aidos-split-panel-header
            align="center"
            gap="medium"
            jss={{ height: 39, flexShrink: 0, paddingInline: "16px 12px" }}
          >
            <BaseView jss={{ flex: 1, minWidth: 0 }}>
              {panelHeader ?? (
                <Text type="h2" bold>
                  {panelTitle}
                </Text>
              )}
            </BaseView>
            {showPanelCloseButton && (
              <IconButton
                ref={close}
                bare
                color="secondary"
                size="xsmall"
                icon={takeover ? "arrow-left" : "x"}
                aria-label={
                  takeover ? "Back to content" : `Close ${panelTitle}`
                }
                onClick={() => changeOpen(false)}
              />
            )}
          </Row>
          <BaseView
            data-aidos-split-panel-content
            tabIndex={-1}
            jss={[
              column,
              {
                flex: 1,
                overflow: "auto",
                overscrollBehavior: "contain",
                outline: "none",
              },
            ]}
          >
            {content}
          </BaseView>
        </BaseView>
      </BaseView>
    </BaseView>
  );
}
