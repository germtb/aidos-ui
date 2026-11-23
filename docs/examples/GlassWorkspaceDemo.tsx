import React, { useId, useRef, useState } from "react";
import {
  AdaptiveSplitView,
  Card,
  Column,
  Composer,
  IconButton,
  List,
  ListButtonItem,
  Menu,
  MenuItem,
  Pane,
  PopoverTrigger,
  Row,
  Sublist,
  Tabs,
  Text,
  TextInput,
  Workspace,
} from "../../src";

const conversations = ["Design", "Implementation", "Release"];
const discussion = [
  [
    "You",
    "Let's make the workspace feel lighter without removing the structure. Keep the document readable and let the controls float above it.",
  ],
  [
    "Assistant",
    "The navigation is a separate glass surface. Individual tabs and header actions use the same material; there is no opaque bar behind them.",
  ],
  [
    "You",
    "The composer should start on one line. Keep the send action beside the draft, even when a longer message wraps.",
  ],
  [
    "Assistant",
    "The reading pane extends from the top to the bottom of the workspace. Its header and composer are overlays, not rows that shorten the document.",
  ],
  [
    "You",
    "What happens to the first and last messages? They still need to be reachable without hiding behind the controls.",
  ],
  [
    "Assistant",
    "The pane reserves scrollable space using the measured header and footer heights. When the composer grows, the bottom inset follows it.",
  ],
  [
    "You",
    "Keep keyboard navigation, drafts, and the inspector working. The material shouldn't introduce a different set of controls.",
  ],
  [
    "Assistant",
    "Try switching tabs, writing a multiline draft, opening the inspector, or narrowing the window. These are the same Aidos components used in the rest of the documentation.",
  ],
  ["You", "And the translucency preferences?"],
  [
    "Assistant",
    "Reduced transparency replaces glass with opaque surfaces. The layout and interaction stay the same; reduced motion keeps the reflections still.",
  ],
];

export function GlassWorkspaceDemo() {
  const id = useId();
  const [selected, setSelected] = useState("Design");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Record<string, string[]>>({});
  const [inspecting, setInspecting] = useState(false);
  const [note, setNote] = useState("");
  const reader = useRef<HTMLElement>(null);
  const positions = useRef<Record<string, number>>({});
  const select = (name: string) => {
    positions.current[selected] = reader.current?.scrollTop ?? 0;
    setSelected(name);
    requestAnimationFrame(() =>
      reader.current?.scrollTo({ top: positions.current[name] ?? 0 }),
    );
  };
  const latest = () =>
    requestAnimationFrame(() =>
      reader.current?.scrollTo({ top: reader.current.scrollHeight }),
    );

  return (
    <Workspace
      data-glass-workspace-demo
      navigationTitle="Studio"
      navigationMaterial="glass"
      jss={{ height: 620, flex: "none" }}
      navigation={({ dismissNavigation }) => (
        <Pane tag="nav" aria-label="Studio navigation" padding="medium">
          <List ariaLabel="Studio conversations" jss={{ flexShrink: 0 }}>
            <Sublist label="Workspace refresh" labelBold>
              {conversations.map((name) => (
                <ListButtonItem
                  key={name}
                  headline={name}
                  icon="message-square"
                  selected={selected === name}
                  onClick={() => {
                    select(name);
                    dismissNavigation();
                  }}
                />
              ))}
            </Sublist>
          </List>
        </Pane>
      )}
    >
      <AdaptiveSplitView
        panelTitle="Conversation details"
        header={() => null}
        panelWidth={260}
        minContentWidth={400}
        open={inspecting}
        onOpenChange={setInspecting}
        panel={
          <Column padding="xlarge" gap="xlarge">
            <Text bold>{selected}</Text>
            <Text color="secondary" ellipsis={false}>
              A local workspace example. Messages and notes stay in this page.
            </Text>
            <TextInput
              aria-label="Conversation note"
              placeholder="Add a private note…"
              value={note}
              onValueChange={setNote}
            />
            <Card variant="tonal">
              <Text bold size="small">
                Shared primitives
              </Text>
              <Text size="small" color="secondary" ellipsis={false}>
                Workspace · Pane · Tabs · Composer
              </Text>
            </Card>
          </Column>
        }
      >
        <Pane
          ref={reader}
          overlay="both"
          aria-label="Studio conversation"
          header={
            <Row
              align="center"
              gap="small"
              jss={{
                height: 52,
                paddingInlineStart:
                  "calc(8px + var(--aidos-header-leading-inset, 0px))",
                paddingInlineEnd: 12,
              }}
            >
              <Tabs
                variant="document"
                tabMaterial="glass"
                aria-label="Studio tabs"
                aria-controls={`${id}-${selected}-panel`}
                jss={{
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: 0,
                  height: "100%",
                  borderBottom: 0,
                  paddingInline: 0,
                  gap: 6,
                }}
                tabs={conversations.map((name) => ({
                  id: `${id}-${name}-tab`,
                  label: name,
                  selected: selected === name,
                  panelId: `${id}-${name}-panel`,
                  onClick: () => select(name),
                }))}
              />
              <Row gap="small" shrink={false}>
                <PopoverTrigger
                  content={({ close }) => (
                    <Menu label="Conversation actions" onClose={close}>
                      <MenuItem
                        icon="arrow-up"
                        onClick={() => reader.current?.scrollTo({ top: 0 })}
                      >
                        Back to start
                      </MenuItem>
                      <MenuItem icon="arrow-down" onClick={latest}>
                        Jump to latest
                      </MenuItem>
                    </Menu>
                  )}
                >
                  {({ toggle, expanded, id: menuId }) => (
                    <IconButton
                      material="glass"
                      size="small"
                      icon="ellipsis"
                      color="secondary"
                      aria-label="Conversation actions"
                      aria-haspopup="menu"
                      aria-expanded={expanded}
                      aria-controls={menuId}
                      onClick={() => toggle()}
                    />
                  )}
                </PopoverTrigger>
                <IconButton
                  material="glass"
                  size="small"
                  icon="panel-right"
                  color="secondary"
                  aria-label={
                    inspecting
                      ? "Hide conversation details"
                      : "Show conversation details"
                  }
                  aria-expanded={inspecting}
                  onClick={() => setInspecting(!inspecting)}
                />
              </Row>
            </Row>
          }
          footer={
            <Column padding="large">
              <Composer
                material="glass"
                aria-label="Studio message"
                placeholder={`Message ${selected.toLowerCase()}…`}
                value={drafts[selected] ?? ""}
                onValueChange={(value) =>
                  setDrafts((items) => ({ ...items, [selected]: value }))
                }
                onSubmit={() => {
                  setMessages((items) => ({
                    ...items,
                    [selected]: [...(items[selected] ?? []), drafts[selected]],
                  }));
                  setDrafts((items) => ({ ...items, [selected]: "" }));
                  latest();
                }}
              />
            </Column>
          }
        >
          {conversations.map((name) => (
            <div
              key={name}
              id={`${id}-${name}-panel`}
              role="tabpanel"
              aria-labelledby={`${id}-${name}-tab`}
              hidden={name !== selected}
            >
              <Column
                gap="xxlarge"
                jss={{ maxWidth: 720, marginInline: "auto", paddingInline: 8 }}
              >
                <Text size="xlarge" bold>
                  {name} conversation
                </Text>
                {discussion.map(([author, body], index) => (
                  <Column key={index} tag="article" gap="medium">
                    <Text
                      size="small"
                      bold
                      color={author === "You" ? "primary" : "highlight"}
                    >
                      {author}
                    </Text>
                    <Text ellipsis={false} jss={{ lineHeight: 1.7 }}>
                      {body}
                    </Text>
                  </Column>
                ))}
                {(messages[name] ?? []).map((message, index) => (
                  <Column key={index} tag="article" gap="medium">
                    <Text size="small" bold>
                      You
                    </Text>
                    <Text
                      ellipsis={false}
                      jss={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
                    >
                      {message}
                    </Text>
                  </Column>
                ))}
              </Column>
            </div>
          ))}
        </Pane>
      </AdaptiveSplitView>
    </Workspace>
  );
}
