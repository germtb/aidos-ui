import React, { useCallback, useState } from "react";
import { BaseView, type BaseViewProps } from "./BaseView";
import { useRefEffect } from "./useRefEffect";

export interface DisclosureProps extends BaseViewProps {
  expanded: boolean;
}

export function Disclosure({
  expanded,
  children,
  jss,
  ...props
}: DisclosureProps) {
  const [present, setPresent] = useState(expanded);
  if (expanded && !present) setPresent(true);
  const mount = useRefEffect(
    useCallback(
      (element: HTMLElement) => {
        // React 18 does not forward the boolean inert attribute.
        element.inert = !expanded;
        if (expanded) return;
        let current = true;
        element.getBoundingClientRect();
        const animations = element.getAnimations();
        void Promise.allSettled(
          animations.map((animation) => animation.finished),
        ).then(() => {
          if (current) setPresent(false);
        });
        return () => {
          current = false;
        };
      },
      [expanded],
    ),
  );
  return (
    <BaseView
      {...props}
      ref={mount}
      aria-hidden={!expanded}
      jss={[
        {
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          minWidth: 0,
          transition: "grid-template-rows 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        },
        jss,
      ]}
    >
      <BaseView jss={{ minHeight: 0, overflow: "hidden" }}>
        {(expanded || present) && children}
      </BaseView>
    </BaseView>
  );
}
