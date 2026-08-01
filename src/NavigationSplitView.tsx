import React, { ReactNode } from "react";

import { BaseView } from "./BaseView";
import {
  JSS,
  cssVar,
  desktop,
  getMaterial,
  laptop,
  mobile,
  tablet,
} from "./jss";

export interface NavigationSplitViewProps {
  navigation: ReactNode;
  children: ReactNode;
  compactHeader?: ReactNode;
  compactNavigation?: ReactNode;
  navigationVisibleInCompact?: boolean;
  navigationWidth?: string;
  navigationInset?: string;
  jss?: JSS;
}

const compactLayout = (hasCompactNavigation: boolean): JSS => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  paddingBottom: hasCompactNavigation ? cssVar("--nav-bar-height") : 0,
});

const expandedLayout = (navigationInset: string): JSS => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  gap: navigationInset,
  padding: navigationInset,
});

export function NavigationSplitView({
  navigation,
  children,
  compactHeader,
  compactNavigation,
  navigationVisibleInCompact = false,
  navigationWidth = "320px",
  navigationInset = "12px",
  jss,
}: NavigationSplitViewProps) {
  return (
    <BaseView
      jss={[
        {
          position: "relative",
          width: "100%",
          height: "auto",
          minWidth: 0,
          minHeight: "100dvh",
          overflow: "visible",
        },
        mobile(compactLayout(compactNavigation != null)),
        tablet(compactLayout(compactNavigation != null)),
        laptop(expandedLayout(navigationInset)),
        desktop(expandedLayout(navigationInset)),
        jss,
      ]}
    >
      <BaseView
        jss={[
          {
            minWidth: 0,
            minHeight: 0,
            overflow: "hidden",
            zIndex: 1,
          },
          mobile({
            display: navigationVisibleInCompact ? "block" : "none",
            width: "100%",
            flex: "1 1 auto",
            order: 1,
          }),
          tablet({
            display: navigationVisibleInCompact ? "block" : "none",
            width: "100%",
            flex: "1 1 auto",
            order: 1,
          }),
          laptop({
            display: "block",
            width: navigationWidth,
            flex: `0 0 ${navigationWidth}`,
            order: 0,
            position: "sticky",
            top: navigationInset,
            height: `calc(100dvh - ${navigationInset} - ${navigationInset})`,
            overflow: "visible",
          }),
          desktop({
            display: "block",
            width: navigationWidth,
            flex: `0 0 ${navigationWidth}`,
            order: 0,
            position: "sticky",
            top: navigationInset,
            height: `calc(100dvh - ${navigationInset} - ${navigationInset})`,
            overflow: "visible",
          }),
        ]}
      >
        {navigation}
      </BaseView>

      <BaseView
        jss={[
          {
            minWidth: 0,
            minHeight: 0,
            overflow: "hidden",
          },
          mobile({
            display: navigationVisibleInCompact ? "none" : "block",
            width: "100%",
            order: 1,
          }),
          tablet({
            display: navigationVisibleInCompact ? "none" : "block",
            width: "100%",
            order: 1,
          }),
          laptop({ display: "block", flex: "1 1 0", order: 0 }),
          desktop({ display: "block", flex: "1 1 0", order: 0 }),
        ]}
      >
        {children}
      </BaseView>

      <BaseView
        jss={[
          mobile({
            display: "block",
            position: "sticky",
            top: 0,
            width: "100%",
            order: 0,
            zIndex: 2,
            ...getMaterial("aurora"),
          }),
          tablet({
            display: "block",
            position: "sticky",
            top: 0,
            width: "100%",
            order: 0,
            zIndex: 2,
            ...getMaterial("aurora"),
          }),
          laptop({ display: "none", position: "static" }),
          desktop({ display: "none", position: "static" }),
        ]}
      >
        {compactHeader}
      </BaseView>

      <BaseView
        jss={[
          mobile({
            display: "block",
            position: "fixed",
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
          }),
          tablet({
            display: "block",
            position: "fixed",
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
          }),
          laptop({ display: "none", position: "static" }),
          desktop({ display: "none", position: "static" }),
        ]}
      >
        {compactNavigation}
      </BaseView>
    </BaseView>
  );
}
