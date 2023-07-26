import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { PropsWithChildren } from "react";
import { H1, H2, H3, Li, P, Span } from "../Text";
import { BaseLink } from "../BaseLink";
import { BaseView } from "../BaseView";
import { ListDivider } from "../ListDivider";
import { cssVar } from "../jss";
import { Roboto } from "next/font/google";

const monospace = Roboto({ weight: "400", subsets: ["latin"] });

const components: any = {
  h1: (props) => (
    <H1 jsStyle={{ marginBottom: cssVar("--spacing-xl") }} {...props} />
  ),
  h2: (props) => (
    <H2
      id={labelToID(props.children)}
      jsStyle={{ marginBottom: cssVar("--spacing-l") }}
      {...props}
    />
  ),
  h3: (props) => {
    return <H3 id={labelToID(props.children)} {...props} />;
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

export function labelToID(string: string): string {
  return string
    .replace(/[A-Z]/g, (m) => m.toLowerCase())
    .replace(/\s/g, "-")
    .replace(/\?/g, "");
}

export function DocsMDXProvider({ children }: PropsWithChildren<{}>) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
