import React, { useId, useRef, useState } from "react";
import {
  ActionScope,
  Avatar,
  Button,
  Checkbox,
  Column,
  Composer,
  ContextualActions,
  Icon,
  IconButton,
  Prose,
  Pane,
  Row,
  Tabs,
  Text,
} from "../../src";
import styles from "./WorkspaceDemo.module.css";

export const reviewFiles = [
  {
    id: "shell",
    name: "Shell.tsx",
    path: "src/workspace/Shell.tsx",
    summary: "Give the inspector room without losing the work underneath it.",
    diff: [
      "@@ -18,10 +18,13 @@ Workspace layout",
      " export function Workspace() {",
      "   const [inspecting, setInspecting] = useState(false);",
      "+  const compact = useCompactLayout();",
      " ",
      "   return (",
      '-    <div className="workspace">',
      "-      {!inspecting && <Document />}",
      "-      {inspecting && <Inspector />}",
      '+    <div className="workspace" data-compact={compact}>',
      "+      <main hidden={compact && inspecting}>",
      "+        <Document />",
      "+      </main>",
      "+      <Inspector hidden={!inspecting} />",
      "     </div>",
      "   );",
      " }",
      "@@ -40,7 +43,13 @@ Returning to the document",
      " function closeInspector() {",
      "   setInspecting(false);",
      "+  requestAnimationFrame(() => {",
      "+    returnFocus.current?.focus({",
      "+      preventScroll: true,",
      "+    });",
      "+  });",
      " }",
      " ",
      " function openInspector() {",
      "+  returnFocus.current = document.activeElement;",
      "   setInspecting(true);",
      " }",
    ],
  },
  {
    id: "layout",
    name: "layout.css",
    path: "src/workspace/layout.css",
    summary: "Two independent working areas. One continuous, quiet surface.",
    diff: [
      "@@ -1,9 +1,15 @@ Workspace columns",
      " .workspace {",
      "   display: grid;",
      "   min-height: 0;",
      "-  grid-template-columns: 1fr;",
      "+  grid-template-columns: minmax(0, 1fr) 320px;",
      " }",
      " ",
      "+.workspace[data-compact='true'] {",
      "+  grid-template-columns: minmax(0, 1fr);",
      "+}",
      "+",
      " .document, .inspector {",
      "+  min-width: 0;",
      "   overflow-y: auto;",
      "+  overscroll-behavior: contain;",
      " }",
      "@@ -24,3 +30,9 @@ Motion preferences",
      " .inspector {",
      "   border-inline-start: 1px solid var(--divider);",
      " }",
      "+",
      "+@media (prefers-reduced-motion: reduce) {",
      "+  .workspace {",
      "+    transition: none;",
      "+  }",
      "+}",
    ],
  },
  {
    id: "navigation",
    name: "Navigation refresh",
    path: "docs/navigation.md",
    summary:
      "Give ongoing work a home without letting the navigation take over the workspace.",
    decisions: [
      "Keep projects and recent work together, with one place to search.",
      "Let people leave navigation open when they need it, and put it away when they don’t.",
      "Keep the current document in place when moving between layouts.",
    ],
  },
  {
    id: "keyboard",
    name: "Keyboard accessibility",
    path: "docs/keyboard.md",
    summary:
      "Make the workspace equally useful without a pointer. Focus should follow intent, not the animation.",
    decisions: [
      "Keep a predictable tab order across the application.",
      "Return focus to the trigger when a temporary panel closes.",
      "Preserve the same controls when a panel docks or takes over.",
    ],
  },
  {
    id: "release",
    name: "Release checklist",
    path: "docs/release.md",
    summary:
      "Ship a small, coherent update. Keep the things that work and make each change easy to evaluate.",
    decisions: [
      "Review the same populated screen in light and dark mode.",
      "Try a narrow window, keyboard navigation, and reduced motion.",
      "Separate layout experiments from changes to shared component defaults.",
    ],
  },
];

export type ReviewFile = (typeof reviewFiles)[number];

export function DiffStats({ file }: { file: ReviewFile }) {
  if (!file.diff) return null;
  const added = file.diff.filter((line) => line.startsWith("+")).length;
  const removed = file.diff.filter((line) => line.startsWith("-")).length;
  return (
    <span
      className={styles.stats}
      aria-label={`${added} additions, ${removed} deletions`}
    >
      <span className={styles.added}>+{added}</span>
      <span className={styles.removed}>−{removed}</span>
    </span>
  );
}

function numberDiff(lines: string[]) {
  let before = 0;
  let after = 0;
  return lines.map((line) => {
    const ranges = line.match(/@@ -(\d+),\d+ \+(\d+),\d+ @@ (.*)/);
    if (ranges) {
      before = Number(ranges[1]) - 1;
      after = Number(ranges[2]) - 1;
    } else {
      if (line[0] !== "+") before++;
      if (line[0] !== "-") after++;
    }
    return { line, before, after, heading: ranges?.[3] };
  });
}

export function ReviewContent({
  file,
  onInspect,
}: {
  file: ReviewFile;
  onInspect: () => void;
}) {
  const id = useId();
  const [view, setView] = useState("changes");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  return (
    <article className={file.diff ? styles.diffDocument : styles.document}>
      <Column gap="large">
        <Row align="center" gap="small">
          <Icon
            icon={file.diff ? "git-pull-request" : "file-text"}
            size="small"
            color="secondary"
          />
          <Text size="small" color="secondary">
            {file.diff ? "Modified file" : "Working document"} · Atlas
          </Text>
        </Row>
        <Text type="h1" size="xxlarge" bold ellipsis={false}>
          {file.name}
        </Text>
        <Prose>
          <p>{file.summary}</p>
        </Prose>
      </Column>
      {file.diff ? (
        <>
          <div className={styles.diffToolbar}>
            <DiffStats file={file} />
            <Tabs
              variant="segmented"
              aria-label={`View ${file.name}`}
              aria-controls={`${id}-panel`}
              tabs={[
                {
                  id: `${id}-changes`,
                  label: "Changes",
                  selected: view === "changes",
                  onClick: () => setView("changes"),
                },
                {
                  id: `${id}-result`,
                  label: "Result",
                  selected: view === "result",
                  onClick: () => setView("result"),
                },
              ]}
            />
          </div>
          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-${view}`}
            className={styles.diffViewport}
            tabIndex={-1}
          >
            <code className={styles.diff} aria-label={`${file.name} ${view}`}>
              {numberDiff(file.diff).map(
                ({ line, before, after, heading }, index) => {
                  if (heading) {
                    return (
                      <div key={index} className={styles.hunk}>
                        {view === "changes" ? line : heading}
                      </div>
                    );
                  }
                  const kind = line[0];
                  if (view === "result" && kind === "-") return null;
                  return (
                    <div
                      key={index}
                      className={styles.codeLine}
                      data-kind={view === "changes" ? kind : " "}
                    >
                      <span className={styles.lineNumber} aria-hidden>
                        {view === "changes" && kind !== "+" ? before : ""}
                      </span>
                      <span className={styles.lineNumber} aria-hidden>
                        {kind !== "-" ? after : ""}
                      </span>
                      <span
                        className={styles.lineSign}
                        aria-label={
                          view === "changes" && kind === "+"
                            ? "Added"
                            : view === "changes" && kind === "-"
                              ? "Removed"
                              : undefined
                        }
                      >
                        {view === "changes" ? kind : " "}
                      </span>
                      <span>{line.slice(1) || " "}</span>
                    </div>
                  );
                },
              )}
            </code>
          </div>
          <div className={styles.reviewCallout}>
            <Icon icon="message-square" size="small" color="secondary" />
            <Column gap="small" grow>
              <Text bold>One detail worth checking</Text>
              <Text color="secondary" ellipsis={false}>
                Leave a draft in the inspector, then change the window width.
                Neither the draft nor your reading position should reset.
              </Text>
              <Button
                bare
                color="secondary"
                size="small"
                icon="arrow-up-right"
                onClick={onInspect}
                jss={{ alignSelf: "flex-start", marginInlineStart: -8 }}
              >
                Open review
              </Button>
            </Column>
          </div>
        </>
      ) : (
        <>
          <Column gap="large">
            <Text type="h2" size="large" bold>
              Decisions
            </Text>
            <Prose>
              <p>
                Start with the work, then make room for the tools around it.
              </p>
              <ul>
                {file.decisions?.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </Prose>
          </Column>
          <Column gap="large">
            <Text type="h2" size="large" bold>
              Acceptance checklist
            </Text>
            {[
              "Review the desktop composition",
              "Try a narrow workspace",
              "Walk through the keyboard flow",
              "Collect feedback before shipping",
            ].map((task, index) => {
              const id = `${file.id}-task-${index}`;
              return (
                <Row key={id} gap="medium" align="center">
                  <Checkbox
                    id={id}
                    size="small"
                    checked={Boolean(checked[id])}
                    onClick={() =>
                      setChecked((items) => ({ ...items, [id]: !items[id] }))
                    }
                  />
                  <Text type="label" htmlFor={id} ellipsis={false}>
                    {task}
                  </Text>
                </Row>
              );
            })}
          </Column>
          <Column gap="large">
            <Text type="h2" size="large" bold>
              What stays in place
            </Text>
            <Prose>
              <p>
                A wide window should support moving between files without losing
                the current task. A narrow window should give that task the room
                it needs, without removing access to navigation.
              </p>
              <blockquote>
                Changing the layout is not starting a new session.
              </blockquote>
              <p>
                The reading position, open files, review decisions, and
                unfinished notes belong to the work—not the arrangement of the
                panels.
              </p>
              <h3>Review in context</h3>
              <p>
                Open Shell.tsx and compare the implementation with these
                decisions. Use the inspector for questions and keep the document
                open as a reference.
              </p>
            </Prose>
            <Button
              bare
              color="secondary"
              size="small"
              icon="message-square"
              onClick={onInspect}
              jss={{ alignSelf: "flex-start" }}
            >
              Discuss this document
            </Button>
          </Column>
          <Column gap="large">
            <Text type="h2" size="large" bold>
              Before we ship
            </Text>
            <Prose>
              <p>
                Check light and dark themes, a keyboard-only review, and a
                phone-sized window. Keep the scope small: layout and interaction
                first, shared component APIs after review.
              </p>
            </Prose>
          </Column>
        </>
      )}
    </article>
  );
}

const initialNotes = [
  {
    id: 1,
    file: "shell",
    author: "Maya Chen",
    body: "Keeping the document mounted is the important part here. Can we also keep its scroll position when the inspector takes over?",
    resolved: false,
  },
  {
    id: 2,
    file: "shell",
    author: "Alex Rivera",
    body: "Yes — the narrow layout hides the document rather than replacing it. The notes draft stays mounted too.",
    resolved: false,
  },
  {
    id: 3,
    file: "layout",
    author: "Maya Chen",
    body: "Independent scrolling feels right. Please check that the header stays opaque when the diff moves underneath it.",
    resolved: false,
  },
];

export function ReviewInspector({
  file,
  reviewed,
  onReviewed,
  onNext,
}: {
  file: ReviewFile;
  reviewed: boolean;
  onReviewed: () => void;
  onNext: () => void;
}) {
  const [tab, setTab] = useState("review");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState(initialNotes);
  const [showResolved, setShowResolved] = useState(false);
  const nextNote = useRef(4);
  const body = useRef<HTMLDivElement>(null);
  const draft = drafts[file.id] ?? "";
  const fileNotes = notes.filter((note) => note.file === file.id);
  const unresolved = fileNotes.filter((note) => !note.resolved);
  return (
    <>
      <Tabs
        variant="segmented"
        aria-controls="review-details"
        aria-label="Inspector views"
        tabs={[
          {
            id: "review-tab",
            label: "Review",
            selected: tab === "review",
            onClick: () => setTab("review"),
            panelId: "review-details",
          },
          {
            id: "activity-tab",
            label: "Activity",
            selected: tab === "activity",
            onClick: () => setTab("activity"),
            panelId: "review-activity",
          },
        ]}
        jss={{ flexShrink: 0, margin: "8px 16px 0" }}
      />
      <Pane
        id="review-details"
        role="tabpanel"
        aria-labelledby="review-tab"
        hidden={tab !== "review"}
        ref={body}
        padding={["xxlarge", "xlarge"]}
        footer={
          <div className={styles.composer}>
            <Composer
              aria-label={`Note on ${file.name}`}
              placeholder="Leave a review note…"
              value={draft}
              onValueChange={(value) =>
                setDrafts((items) => ({ ...items, [file.id]: value }))
              }
              submitLabel="Add note"
              onSubmit={() => {
                const id = nextNote.current++;
                setNotes((items) => [
                  ...items,
                  {
                    id,
                    file: file.id,
                    author: "You",
                    body: draft.trim(),
                    resolved: false,
                  },
                ]);
                setDrafts((items) => ({ ...items, [file.id]: "" }));
                requestAnimationFrame(() =>
                  body.current?.scrollTo({ top: body.current.scrollHeight }),
                );
              }}
              footer={
                <Text size="small" color="secondary">
                  Only in this demo
                </Text>
              }
              jss={{ maxHeight: 140 }}
            />
            <Text size="small" color="secondary">
              Enter to add · Shift + Enter for a new line
            </Text>
          </div>
        }
      >
        <Column gap="large">
          <Column gap="small">
            <Text size="small" color="secondary">
              Reviewing
            </Text>
            <Text bold ellipsis={false}>
              {file.name}
            </Text>
            <Text size="small" color="secondary" ellipsis={false}>
              {file.path}
            </Text>
            <DiffStats file={file} />
          </Column>
          <div className={styles.reviewDecision}>
            <Row gap="small" align="center">
              <Checkbox
                id="file-reviewed"
                size="small"
                checked={reviewed}
                onClick={onReviewed}
              />
              <Text type="label" htmlFor="file-reviewed" bold>
                Mark as reviewed
              </Text>
            </Row>
            {reviewed && (
              <Button
                bare
                color="secondary"
                size="small"
                icon="arrow-right"
                onClick={onNext}
              >
                Next file
              </Button>
            )}
          </div>
          <Row align="center" gap="small">
            <Text type="h2" bold jss={{ flex: 1 }}>
              Discussion · {unresolved.length}
            </Text>
            {fileNotes.some((note) => note.resolved) && (
              <Button
                bare
                color="secondary"
                size="small"
                aria-pressed={showResolved}
                onClick={() => setShowResolved(!showResolved)}
              >
                {showResolved ? "Hide resolved" : "Show resolved"}
              </Button>
            )}
          </Row>
          {fileNotes.length === 0 && (
            <Text color="secondary" ellipsis={false}>
              No notes yet. Add a question or record what you checked.
            </Text>
          )}
          {fileNotes.length > 0 && unresolved.length === 0 && !showResolved && (
            <Text color="secondary">All notes resolved.</Text>
          )}
          {fileNotes
            .filter((note) => showResolved || !note.resolved)
            .map((note) => (
              <ActionScope
                key={note.id}
                jss={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Row align="center" gap="small">
                  <Avatar name={note.author} size="small" />
                  <Text bold jss={{ flex: 1 }}>
                    {note.author}
                  </Text>
                  <ContextualActions>
                    <IconButton
                      bare
                      color="secondary"
                      size="xsmall"
                      icon={note.resolved ? "undo-2" : "check"}
                      aria-label={`${note.resolved ? "Reopen" : "Resolve"} note by ${note.author}`}
                      onClick={() => {
                        // Keep the action mounted so resolving a note does not strand focus.
                        setShowResolved(true);
                        setNotes((items) =>
                          items.map((item) =>
                            item.id === note.id
                              ? { ...item, resolved: !item.resolved }
                              : item,
                          ),
                        );
                      }}
                    />
                  </ContextualActions>
                </Row>
                <Text
                  ellipsis={false}
                  jss={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}
                >
                  {note.body}
                </Text>
                {note.resolved && (
                  <Text size="small" color="secondary">
                    Resolved
                  </Text>
                )}
              </ActionScope>
            ))}
        </Column>
      </Pane>
      <Pane
        id="review-activity"
        role="tabpanel"
        aria-labelledby="activity-tab"
        padding={["xxlarge", "xlarge"]}
        hidden={tab !== "activity"}
      >
        <Text type="h2" bold jss={{ marginBottom: 24 }}>
          This review
        </Text>
        <div className={styles.activity}>
          {[
            [
              "Review opened",
              "Maya requested a review of the navigation refresh.",
            ],
            [
              "Implementation updated",
              "Two source files and three working documents are ready.",
            ],
            [
              "Keyboard pass",
              "Focus returns to the trigger. Reading panes stay out of the tab order.",
            ],
            [
              "Your session",
              `${notes.length - initialNotes.length} notes added. Drafts and review progress stay here until you reload.`,
            ],
          ].map(([title, description]) => (
            <Column key={title} gap="small">
              <Text bold>{title}</Text>
              <Text color="secondary" ellipsis={false}>
                {description}
              </Text>
            </Column>
          ))}
        </div>
        <details className={styles.reviewChecks}>
          <summary>Manual review guide</summary>
          <Prose>
            <ul>
              <li>Scroll both working areas independently.</li>
              <li>Leave a draft and switch to Compact.</li>
              <li>Close the inspector with Escape.</li>
              <li>Reorder the open files with Alt + Shift + Arrow.</li>
            </ul>
          </Prose>
        </details>
      </Pane>
    </>
  );
}
