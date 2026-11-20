import React, { useRef, useState } from "react";
import {
  AdaptiveSplitView,
  ButtonGroup,
  Icon,
  IconButton,
  List,
  ListButtonItem,
  Menu,
  MenuItem,
  PopoverTrigger,
  Sublist,
  Tabs,
  Text,
  TextInput,
  Workspace,
  TabBar,
  Pane,
  Column,
  Row,
  ProgressBar,
} from "../../src";
import styles from "./WorkspaceDemo.module.css";
import {
  DiffStats,
  ReviewContent,
  reviewFiles,
  ReviewInspector,
} from "./ShellReview";

export function WorkspaceDemo() {
  const [preview, setPreview] = useState("available");
  const [section, setSection] = useState("files");
  const [selected, setSelected] = useState("shell");
  const [tabs, setTabs] = useState(["navigation", "shell", "layout"]);
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});
  const bodies = useRef<Record<string, HTMLElement>>({});
  const activeFile = reviewFiles.find((file) => file.id === selected)!;
  const reviewedCount = reviewFiles.filter((file) => reviewed[file.id]).length;
  const matches = reviewFiles.filter(
    (file) =>
      (section !== "reviewed" || reviewed[file.id]) &&
      file.path
        .concat(" ", file.name)
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
  );

  const selectFile = (id: string) => {
    setSelected(id);
    setTabs((items) => (items.includes(id) ? items : [...items, id]));
  };
  const nextFile = () => {
    const remaining = reviewFiles
      .slice(reviewFiles.indexOf(activeFile) + 1)
      .concat(reviewFiles.slice(0, reviewFiles.indexOf(activeFile)));
    selectFile(
      (remaining.find((file) => !reviewed[file.id]) ?? remaining[0]).id,
    );
  };

  return (
    <div
      className={styles.preview}
      data-workspace-example
      role="region"
      aria-label="Workspace example"
    >
      <div className={styles.controls}>
        <ButtonGroup
          label="Preview width"
          value={preview}
          onValueChange={setPreview}
          options={[
            { value: "available", label: "Available" },
            { value: "compact", label: "Compact" },
          ]}
        />
      </div>
      <Workspace
        data-preview={preview}
        data-workspace-demo
        jss={{
          maxWidth: preview === "compact" ? 640 : 1440,
          marginInline: "auto",
          transition: "max-width 220ms cubic-bezier(0.2, 0, 0, 1)",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
        navigationTitle="Atlas"
        rail={({ showNavigation }) => (
          <TabBar
            variant="rail"
            aria-label="Workspace views"
            tabs={[
              {
                label: "Changed files",
                icon: "files",
                selected: section === "files",
                onClick: () => {
                  setSection("files");
                  showNavigation();
                },
              },
              {
                label: "Reviewed files",
                icon: "circle-check",
                selected: section === "reviewed",
                onClick: () => {
                  setSection("reviewed");
                  showNavigation();
                },
              },
            ]}
          />
        )}
        navigation={({ dismissNavigation }) => (
          <Pane
            tag="nav"
            aria-label="Review navigation"
            padding={["large", "medium"]}
          >
            <Column gap="xlarge" grow>
              <div className={styles.projectSummary}>
                <Text bold>Navigation refresh</Text>
                <div className={styles.branch}>
                  <Icon icon="git-branch" size="small" color="secondary" />
                  <Text size="small" color="secondary">
                    navigation-refresh
                  </Text>
                </div>
              </div>
              <TextInput
                size="small"
                aria-label="Find a file"
                placeholder="Find a file…"
                value={query}
                onValueChange={(value) => {
                  setQuery(value);
                  setCollapsed({});
                }}
                addOn={<Icon icon="search" size="small" color="secondary" />}
              />
              <List ariaLabel="Review files" navigation>
                {[
                  { name: "Source", source: true },
                  { name: "Documents", source: false },
                ].map((group) => {
                  const files = matches.filter(
                    (file) => Boolean(file.diff) === group.source,
                  );
                  if (!files.length) return null;
                  return (
                    <Sublist
                      key={group.name}
                      label={`${group.name} · ${files.length}`}
                      expanded={!collapsed[group.name]}
                      onExpandedChange={(expanded) =>
                        setCollapsed((items) => ({
                          ...items,
                          [group.name]: !expanded,
                        }))
                      }
                    >
                      {files.map((file) => (
                        <ListButtonItem
                          key={file.id}
                          headline={file.name}
                          size="small"
                          indent={12}
                          iconSize="small"
                          icon={
                            reviewed[file.id]
                              ? "circle-check"
                              : file.diff
                                ? "file-code"
                                : "file-text"
                          }
                          selected={selected === file.id}
                          aria-label={`${file.name}${reviewed[file.id] ? ", reviewed" : ""}`}
                          onClick={() => {
                            selectFile(file.id);
                            dismissNavigation();
                          }}
                        />
                      ))}
                    </Sublist>
                  );
                })}
              </List>
              {!matches.length && (
                <Text color="secondary" jss={{ paddingInline: 8 }}>
                  {section === "reviewed" && !query
                    ? "Mark a file as reviewed to find it here."
                    : "No matching files"}
                </Text>
              )}
              <div className={styles.reviewProgress}>
                <Text size="small" color="secondary" role="status">
                  {reviewedCount} of {reviewFiles.length} files reviewed
                </Text>
                <ProgressBar
                  aria-label="Review progress"
                  progress={reviewedCount / reviewFiles.length}
                  size="small"
                  jss={{ height: 3, backgroundColor: "var(--divider)" }}
                />
                <Text size="small" color="secondary">
                  Local demo · nothing is published
                </Text>
              </div>
            </Column>
          </Pane>
        )}
      >
        <AdaptiveSplitView
          panelTitle="Inspector"
          header={({ panelToggle }) => (
            <Row
              align="center"
              gap="medium"
              jss={{
                height: 39,
                flexShrink: 0,
                paddingInlineEnd: 8,
                borderBottom: "1px solid var(--divider)",
              }}
            >
              <Tabs
                variant="document"
                jss={{
                  flexGrow: 1,
                  flexShrink: 1,
                  height: "100%",
                  borderBottom: 0,
                }}
                aria-label="Open files"
                aria-controls={`file-panel-${selected}`}
                tabs={tabs.map((id) => {
                  const file = reviewFiles.find((item) => item.id === id)!;
                  return {
                    id: `tab-${id}`,
                    label: file.name,
                    icon: file.diff ? "file-code" : "file-text",
                    selected: id === selected,
                    panelId: `file-panel-${id}`,
                    onClick: () => setSelected(id),
                    onClose:
                      tabs.length > 1
                        ? () => {
                            const remaining = tabs.filter(
                              (item) => item !== id,
                            );
                            setTabs(remaining);
                            if (selected === id)
                              setSelected(
                                remaining[
                                  Math.min(
                                    tabs.indexOf(id),
                                    remaining.length - 1,
                                  )
                                ],
                              );
                          }
                        : undefined,
                  };
                })}
                onReorder={(tabId, targetId) => {
                  const from = tabId.slice(4);
                  const to = targetId.slice(4);
                  setTabs((items) => {
                    const next = items.filter((id) => id !== from);
                    next.splice(items.indexOf(to), 0, from);
                    return next;
                  });
                }}
              />
              <Row align="center" gap="medium" jss={{ flexShrink: 0 }}>
                <PopoverTrigger
                  content={({ close }) => (
                    <Menu label="Review actions" onClose={close}>
                      <MenuItem icon="arrow-right" onClick={nextFile}>
                        {reviewedCount === reviewFiles.length
                          ? "Next file"
                          : "Next unreviewed file"}
                      </MenuItem>
                      <MenuItem
                        icon="arrow-up"
                        onClick={() =>
                          bodies.current[selected]?.scrollTo({ top: 0 })
                        }
                      >
                        Back to top
                      </MenuItem>
                      <MenuItem
                        icon="list-checks"
                        onClick={() => selectFile("release")}
                      >
                        Release checklist
                      </MenuItem>
                    </Menu>
                  )}
                >
                  {({ toggle: showMenu, expanded: menuOpen, id }) => (
                    <IconButton
                      bare
                      color="secondary"
                      size="small"
                      icon="ellipsis"
                      aria-label="Review actions"
                      aria-haspopup="menu"
                      aria-expanded={menuOpen}
                      aria-controls={id}
                      onClick={() => showMenu()}
                    />
                  )}
                </PopoverTrigger>
                {panelToggle}
              </Row>
            </Row>
          )}
          panel={
            <ReviewInspector
              file={activeFile}
              reviewed={Boolean(reviewed[selected])}
              onReviewed={() =>
                setReviewed((items) => ({
                  ...items,
                  [selected]: !items[selected],
                }))
              }
              onNext={nextFile}
            />
          }
        >
          {({ showPanel }) => (
            <Pane
              scroll={false}
              padding="none"
              footer={
                <Row
                  align="center"
                  justify="space-between"
                  gap="large"
                  padding={["none", "xlarge"]}
                >
                  <Text size="small" color="secondary">
                    {activeFile.path}
                  </Text>
                  <DiffStats file={activeFile} />
                </Row>
              }
            >
              {reviewFiles.map((file) => (
                <Pane
                  key={file.id}
                  ref={(element) => {
                    bodies.current[file.id] = element;
                  }}
                  padding="none"
                  id={`file-panel-${file.id}`}
                  role="tabpanel"
                  aria-label={file.name}
                  hidden={selected !== file.id}
                >
                  <ReviewContent file={file} onInspect={showPanel} />
                </Pane>
              ))}
            </Pane>
          )}
        </AdaptiveSplitView>
      </Workspace>
    </div>
  );
}
