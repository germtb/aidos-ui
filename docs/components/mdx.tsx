import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";
import React from "react";
import { PropsWithChildren } from "react";
import { H1, H2, H3, H4, Li, P, Span } from "../../src/Text";
import { BaseLink } from "../../src/BaseLink";
import { BaseView } from "../../src/BaseView";
import { ListDivider } from "../../src/ListDivider";
import { Table as CoreTable } from "../../src/Table";
import { cssVar } from "../../src/jss";
import { GeistMono } from "geist/font/mono";

const TableContext = React.createContext(false);

function InlineCode({ children }) {
  const inTable = React.useContext(TableContext);

  return (
    <span
      className={GeistMono.className}
      style={
        inTable
          ? {
              color: cssVar("--primary-text"),
              fontSize: "0.92em",
              whiteSpace: "nowrap",
            }
          : {
              color: cssVar("--primary-text"),
              backgroundColor: cssVar("--secondary-background"),
              borderRadius: cssVar("--border-radius-m"),
              padding: cssVar("--spacing-xs"),
              border: `1px solid ${cssVar("--divider")}`,
              display: "inline-block",
            }
      }
    >
      {children}
    </span>
  );
}

function MDXTable(props) {
  return (
    <TableContext.Provider value={true}>
      <CoreTable jss={{ marginBottom: cssVar("--spacing-xl") }} {...props} />
    </TableContext.Provider>
  );
}

const components: MDXComponents = {
  h1: (props) => (
    <H1 bold jss={{ marginBottom: cssVar("--spacing-xl") }} {...props} />
  ),
  h2: (props) => (
    <H2
      bold
      id={labelToID(props.children)}
      jss={{ marginBottom: cssVar("--spacing-l") }}
      {...props}
    />
  ),
  h3: (props) => {
    return <H3 bold id={labelToID(props.children)} {...props} />;
  },
  h4: (props) => {
    return <H4 bold id={labelToID(props.children)} {...props} />;
  },
  p: (props) => <P jss={{ marginBottom: cssVar("--spacing-m") }} {...props} />,
  span: (props) => <Span {...props} />,
  li: (props) => (
    <Li jss={{ marginBottom: cssVar("--spacing-s") }} {...props} />
  ),
  a: (props) => {
    return (
      <BaseLink
        bare
        color="primary"
        jss={{
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
      jss={{
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
  code: InlineCode,
  table: MDXTable,
};

export function labelToID(string: string): string {
  return string
    .replace(/[A-Z]/g, (m) => m.toLowerCase())
    .replace(/\s/g, "-")
    .replace(/\?/g, "");
}

export function DocsMDXProvider({ children }: PropsWithChildren) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
