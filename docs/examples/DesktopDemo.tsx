import React, { useRef, useState } from "react";
import {
  ActionScope,
  BaseView,
  Button,
  Card,
  Column,
  Composer,
  ContextualActions,
  Dialog,
  Disclosure,
  Icon,
  IconButton,
  List,
  ListButtonItem,
  Menu,
  MenuItem,
  MenuSubmenu,
  MenuSeparator,
  Modal,
  PopoverTrigger,
  Prose,
  Row,
  SearchList,
  SearchPalette,
  Span,
  Sublist,
  Switch,
  Tabs,
  Text,
  TextArea,
  TextInput,
  Tooltip,
  type ControlSize,
  lightTheme,
  darkTheme,
} from "../../src";

export function ButtonHierarchyDemo() {
  const [action, setAction] = useState(
    "Hover, press, or Tab through the controls. Disabled buttons remain focusable.",
  );
  return (
    <Column gap="medium" data-button-hierarchy-demo>
      <Row gap="large" wrap align="stretch">
        {(
          [
            ["Light", lightTheme],
            ["Dark", darkTheme],
          ] as const
        ).map(([name, theme]) => (
          <Card
            key={name}
            role="group"
            aria-label={`${name} button hierarchy`}
            style={theme as React.CSSProperties}
            gap="large"
            padding="xlarge"
            jss={{
              flex: "1 1 300px",
              minWidth: 0,
              border: "1px solid var(--divider)",
              boxShadow: "none",
            }}
          >
            <Text bold>{name}</Text>
            <Row gap="medium" wrap align="center">
              <Button
                color="primary"
                onClick={() => setAction(`${name}: primary`)}
              >
                Primary
              </Button>
              <Button
                color="secondary"
                onClick={() => setAction(`${name}: secondary`)}
              >
                Secondary
              </Button>
              <Button
                color="secondary"
                bare
                onClick={() => setAction(`${name}: bare`)}
              >
                Bare
              </Button>
              <Button
                color="secondary"
                disabled
                onClick={() => setAction(`${name}: disabled`)}
              >
                Disabled
              </Button>
            </Row>
            <Row gap="medium" wrap align="center">
              <Button
                color="secondary"
                icon="copy"
                onClick={() => setAction(`${name}: duplicate`)}
              >
                Duplicate
              </Button>
              <IconButton
                color="secondary"
                icon="settings"
                aria-label={`${name} settings`}
                onClick={() => setAction(`${name}: settings`)}
              />
              <IconButton
                color="secondary"
                bare
                icon="ellipsis"
                aria-label={`${name} more actions`}
                onClick={() => setAction(`${name}: more actions`)}
              />
            </Row>
          </Card>
        ))}
      </Row>
      <Text role="status" size="small" color="secondary" ellipsis={false}>
        {action}
      </Text>
    </Column>
  );
}

export function ControlSizesDemo() {
  return (
    <Column gap="large">
      {(["xsmall", "small", "medium", "large"] as ControlSize[]).map((size) => (
        <Row key={size} align="center" gap="medium" wrap>
          <Text jss={{ width: 60 }}>{size}</Text>
          <Button size={size} icon="plus" color="secondary" onClick={() => {}}>
            Action
          </Button>
          <IconButton
            size={size}
            icon="settings"
            color="secondary"
            aria-label={`${size} settings`}
            onClick={() => {}}
          />
          <TextInput
            size={size}
            aria-label={`${size} field`}
            placeholder="Matching field"
            jssRoot={{ width: 180 }}
          />
        </Row>
      ))}
      <Row gap="medium" wrap>
        <Button
          size="small"
          bare
          color="secondary"
          leading={<Icon icon="box" size="small" color="inherit" />}
          trailing={<Icon icon="chevron-down" size="small" color="inherit" />}
          jss={{ maxWidth: 200 }}
          onClick={() => {}}
        >
          A deliberately long control label that should truncate
        </Button>
        <Button size="small" color="secondary" disabled onClick={() => {}}>
          Unavailable
        </Button>
      </Row>
    </Column>
  );
}

export function FocusDemo() {
  return (
    <Column gap="large">
      <Row gap="medium" align="center" wrap>
        <Button color="secondary" onClick={() => {}}>
          Keyboard action
        </Button>
        <a href="#focus-native" id="focus-native">
          Native link
        </a>
        <Tooltip content="A hint that never moves keyboard focus">
          <Button bare color="secondary" onClick={() => {}}>
            Focus or hover
          </Button>
        </Tooltip>
      </Row>
      <TextInput
        aria-label="Search with action"
        placeholder="One ring per focused control"
        addOnPosition="end"
        addOn={
          <IconButton
            size="xsmall"
            bare
            color="secondary"
            icon="search"
            aria-label="Search action"
            onClick={() => {}}
          />
        }
      />
      <TextInput
        aria-label="Invalid field"
        aria-invalid="true"
        defaultValue="Invalid input keeps its error indicator"
      />
      <TextArea
        aria-label="Ordinary textarea"
        placeholder="Ordinary textarea: 14px text, integrated focus"
      />
      <div tabIndex={0}>Native focus fallback on custom focusable content.</div>
    </Column>
  );
}

export function ComposerDemo() {
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState("Balanced");
  const [approval, setApproval] = useState(false);
  const [sent, setSent] = useState("");
  const [comment, setComment] = useState("");
  return (
    <Column gap="medium" jss={{ width: "100%", maxWidth: 760 }}>
      <Composer
        aria-label="Composer message"
        value={draft}
        onValueChange={setDraft}
        placeholder="Write a message…"
        onSubmit={() => {
          setSent(draft);
          setDraft("");
        }}
        footer={
          <>
            <PopoverTrigger
              placement="top"
              role="presentation"
              content={({ close }) => (
                <Menu label="Models" onClose={close}>
                  {[
                    "Fast",
                    "Balanced",
                    "Deep reasoning with a long descriptive label",
                  ].map((name) => (
                    <MenuItem
                      key={name}
                      role="menuitemradio"
                      checked={model === name}
                      onClick={() => setModel(name)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            >
              {({ toggle, expanded, id }) => (
                <Button
                  size="small"
                  bare
                  color="secondary"
                  icon="chevron-down"
                  iconPosition="right"
                  aria-haspopup="menu"
                  aria-expanded={expanded}
                  aria-controls={id}
                  jss={{ maxWidth: 220 }}
                  onClick={() => toggle()}
                >
                  {model}
                </Button>
              )}
            </PopoverTrigger>
            <Button
              size="small"
              bare
              color="secondary"
              icon={approval ? "shield-check" : "shield-question"}
              aria-pressed={approval}
              onClick={() => setApproval(!approval)}
            >
              {approval ? "Auto" : "Ask"}
            </Button>
            <Tooltip
              content="37% of the context window is used. This is not an account limit."
              align="end"
            >
              <Span
                tabIndex={0}
                aria-label="37% context used"
                color="secondary"
                size="small"
                jss={{ paddingInline: 4 }}
              >
                37%
              </Span>
            </Tooltip>
          </>
        }
      />
      <Row gap="small" wrap>
        <Button
          size="small"
          bare
          color="secondary"
          onClick={() => setDraft("An externally supplied draft.\n".repeat(12))}
        >
          Load long draft
        </Button>
        <Button
          size="small"
          bare
          color="secondary"
          onClick={() => setDraft("")}
        >
          Clear draft
        </Button>
        <PopoverTrigger
          placement="top"
          ariaLabel="Review comment"
          content={({ close }) => (
            <Column jss={{ width: 360, maxWidth: "100%" }}>
              <Text size="small" color="secondary" jss={{ padding: 8 }}>
                Comment on the selection
              </Text>
              <Composer
                embedded
                aria-label="Review comment"
                value={comment}
                onValueChange={setComment}
                placeholder="Add a comment…"
                onSubmit={() => {
                  setSent(comment);
                  setComment("");
                  close();
                }}
              />
            </Column>
          )}
        >
          {({ toggle, expanded, id }) => (
            <Button
              size="small"
              color="secondary"
              aria-haspopup="dialog"
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => toggle()}
            >
              Review selection
            </Button>
          )}
        </PopoverTrigger>
      </Row>
      <Text role="status" ellipsis={false}>
        {sent
          ? `Sent: ${sent}`
          : "Enter sends · Shift+Enter adds a line · IME composition never submits"}
      </Text>
    </Column>
  );
}

export function MenuDemo() {
  const [checked, setChecked] = useState(true);
  const [action, setAction] = useState("No action yet");
  return (
    <Column gap="medium">
      <Row gap="medium" wrap justify="space-between">
        <PopoverTrigger
          role="presentation"
          content={({ close }) => (
            <Menu
              label="Document actions"
              onClose={close}
              jss={{ width: 280, maxWidth: "100%" }}
            >
              <MenuItem
                icon="pencil"
                description="Rename this document"
                onClick={() => setAction("Edit")}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon="folder"
                onClick={() => setAction("Open project folder")}
              >
                /Users/gerard/workspaces/a-very-long-project-name/packages/desktop
              </MenuItem>
              <MenuItem disabled onClick={() => setAction("Unavailable")}>
                Unavailable action
              </MenuItem>
              <MenuItem
                icon="copy"
                trailing="⌘D"
                onClick={() => setAction("Duplicate")}
              >
                Duplicate
              </MenuItem>
              <MenuSeparator />
              <MenuItem checked={checked} onClick={() => setChecked(!checked)}>
                Show details
              </MenuItem>
              <MenuSeparator />
              <MenuItem
                icon="trash"
                destructive
                onClick={() => setAction("Delete")}
              >
                Delete
              </MenuItem>
            </Menu>
          )}
        >
          {({ toggle, expanded, id }) => (
            <Button
              color="secondary"
              aria-haspopup="menu"
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => toggle()}
            >
              Document actions
            </Button>
          )}
        </PopoverTrigger>
        <PopoverTrigger
          placement="top"
          align="end"
          role="presentation"
          content={({ close }) => (
            <Menu label="Long menu" onClose={close}>
              {Array.from({ length: 30 }, (_, index) => (
                <MenuItem
                  key={index}
                  onClick={() => setAction(`Item ${index + 1}`)}
                >{`Item ${index + 1}`}</MenuItem>
              ))}
            </Menu>
          )}
        >
          {({ toggle, expanded, id }) => (
            <Button
              color="secondary"
              aria-haspopup="menu"
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => toggle()}
            >
              Above, end aligned
            </Button>
          )}
        </PopoverTrigger>
      </Row>
      <Text role="status">{action}</Text>
      <TextInput
        aria-label="Outside popover field"
        placeholder="Outside clicks keep focus here"
      />
    </Column>
  );
}

export function MenuSubmenuDemo() {
  const [provider, setProvider] = useState("Local");
  const [reasoning, setReasoning] = useState("High");
  const [model, setModel] = useState("example-model");
  return (
    <Column gap="medium">
      <PopoverTrigger
        ariaLabel="Composer settings"
        content={({ close }) => (
          <Menu
            label="Settings"
            onClose={close}
            jss={{ width: 300, maxWidth: "100%" }}
          >
            <MenuSubmenu label="Provider" icon="server" trailing={provider}>
              {({ back }) => (
                <Menu label="Providers" onClose={back}>
                  {["Local", "Remote"].map((value) => (
                    <MenuItem
                      key={value}
                      role="menuitemradio"
                      checked={provider === value}
                      onClick={() => setProvider(value)}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </MenuSubmenu>
            <MenuSubmenu label="Reasoning" icon="brain" trailing={reasoning}>
              <Menu label="Reasoning effort">
                {["Low", "Medium", "High"].map((value) => (
                  <MenuItem
                    key={value}
                    role="menuitemradio"
                    checked={reasoning === value}
                    onClick={() => setReasoning(value)}
                  >
                    {value}
                  </MenuItem>
                ))}
              </Menu>
            </MenuSubmenu>
            <MenuSubmenu label="Advanced" icon="settings">
              <Menu label="Advanced settings">
                <MenuSubmenu label="Custom model">
                  <Column gap="medium" padding="medium">
                    <TextInput
                      label="Model ID"
                      value={model}
                      onValueChange={setModel}
                    />
                    <Button color="primary" onClick={close}>
                      Done
                    </Button>
                  </Column>
                </MenuSubmenu>
                <MenuSubmenu label="Unavailable settings" disabled>
                  <Text>This page cannot open.</Text>
                </MenuSubmenu>
              </Menu>
            </MenuSubmenu>
          </Menu>
        )}
      >
        {({ toggle, expanded }) => (
          <Button
            color="secondary"
            aria-haspopup="dialog"
            aria-expanded={expanded}
            onClick={() => toggle()}
          >
            Composer settings
          </Button>
        )}
      </PopoverTrigger>
      <Text size="small" color="secondary" ellipsis={false}>
        {provider} · {reasoning} · {model}
      </Text>
    </Column>
  );
}

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const close = () => setOpen(false);
  return (
    <>
      <Button
        color="secondary"
        jss={{ alignSelf: "flex-start" }}
        onClick={() => setOpen(true)}
      >
        Open flexible dialog
      </Button>
      <Modal
        open={open}
        label="Rename document"
        onClose={close}
        initialFocus={input}
      >
        <Dialog
          label="Rename document"
          close={close}
          footer={
            <>
              <Button bare color="secondary" onClick={close}>
                Cancel
              </Button>
              <Button color="primary" onClick={close}>
                Save
              </Button>
            </>
          }
        >
          <Column padding="large" gap="large">
            <TextInput
              ref={input}
              aria-label="Document name"
              placeholder="Document name"
              value={name}
              onValueChange={setName}
            />
            <MenuDemo />
          </Column>
        </Dialog>
      </Modal>
    </>
  );
}

const searchOptions = [
  {
    value: "new",
    label: "New document",
    description: "Create an empty document",
    icon: "file-plus" as const,
    trailing: "⌘N",
  },
  { value: "disabled", label: "Unavailable command", disabled: true },
  {
    value: "settings",
    label: "Settings",
    description: "Preferences and appearance",
    icon: "settings" as const,
    keywords: "theme",
  },
  {
    value: "history",
    label: "History",
    description: "Recent documents",
    icon: "history" as const,
  },
];

export function SearchDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Nothing selected");
  return (
    <Column gap="medium">
      <Button
        color="secondary"
        jss={{ alignSelf: "flex-start" }}
        onClick={() => setOpen(true)}
      >
        Open command palette
      </Button>
      <SearchPalette
        label="Commands"
        open={open}
        onClose={() => setOpen(false)}
        options={searchOptions}
        onSelect={setSelected}
      />
      <Text role="status">{selected}</Text>
      <Card variant="tonal" padding="none" gap="none">
        <SearchList
          label="Inline search"
          options={searchOptions}
          onSelect={setSelected}
        />
      </Card>
    </Column>
  );
}

export function DocumentTabsDemo() {
  const [tabs, setTabs] = useState([
    "Overview",
    "A long document title that truncates",
    "Notes",
    "Settings",
    "Archive",
  ]);
  const [selected, setSelected] = useState("Overview");
  return (
    <Column gap="medium">
      <Tabs
        variant="document"
        aria-label="Documents"
        aria-controls="document-panel"
        tabs={tabs.map((label, index) => ({
          id: `document-${encodeURIComponent(label)}`,
          label,
          icon: "file",
          selected: selected === label,
          onClick: () => setSelected(label),
          onClose: () => {
            setTabs(tabs.filter((tab) => tab !== label));
            if (selected === label)
              setSelected(tabs[index + 1] ?? tabs[index - 1] ?? "");
          },
        }))}
      />
      <BaseView
        id="document-panel"
        role="tabpanel"
        aria-labelledby={
          selected ? `document-${encodeURIComponent(selected)}` : undefined
        }
        jss={{ padding: 12 }}
      >
        {selected || "All documents closed"}
      </BaseView>
      <Button
        size="small"
        bare
        color="secondary"
        jss={{ alignSelf: "flex-start" }}
        onClick={() => {
          setTabs([
            "Overview",
            "A long document title that truncates",
            "Notes",
            "Settings",
            "Archive",
          ]);
          setSelected("Overview");
        }}
      >
        Reset tabs
      </Button>
    </Column>
  );
}

export function DisclosureDemo() {
  const [expanded, setExpanded] = useState(true);
  return (
    <Column gap="medium">
      <List ariaLabel="Project navigation" gap="none">
        <Sublist
          label="Project files"
          expanded={expanded}
          onExpandedChange={setExpanded}
        >
          <ListButtonItem
            size="small"
            indent={12}
            headline="README.md"
            icon="file"
            onClick={() => {}}
          />
          <ListButtonItem
            size="small"
            indent={12}
            headline="package.json"
            icon="file"
            onClick={() => {}}
            addOn={
              <ContextualActions>
                <IconButton
                  size="xsmall"
                  bare
                  color="secondary"
                  icon="ellipsis"
                  aria-label="File actions"
                  onClick={() => {}}
                />
              </ContextualActions>
            }
          />
        </Sublist>
      </List>
      <Button
        size="small"
        bare
        color="secondary"
        jss={{ alignSelf: "flex-start" }}
        onClick={() => setExpanded(!expanded)}
      >
        Toggle externally
      </Button>
      <Disclosure expanded={expanded}>
        <TextInput
          aria-label="Disclosure field"
          placeholder="Collapsed content is inert"
        />
      </Disclosure>
    </Column>
  );
}

export function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Row align="center" gap="medium" wrap>
      <Switch
        label="Notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Text>{checked ? "Notifications on" : "Notifications off"}</Text>
      <Switch
        label="Unavailable preference"
        checked
        disabled
        onCheckedChange={() => {}}
      />
    </Row>
  );
}

export function ProseDemo() {
  return (
    <ActionScope>
      <Prose>
        <h2>Readable content without a Markdown dependency</h2>
        <p>
          Use <code>Prose</code> around trusted HTML or your renderer’s output.{" "}
          <a href="#prose">Links</a> retain native keyboard focus.
        </p>
        <blockquote>
          A quiet content surface, separate from application chrome.
        </blockquote>
        <ul>
          <li>Consistent spacing and headings.</li>
          <li>Code and tables scroll rather than widening the page.</li>
        </ul>
        <pre>
          <code>{'const message = "Hello";\nconsole.log(message);'}</code>
        </pre>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Ownership</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Composer</td>
              <td>Input experience</td>
            </tr>
            <tr>
              <td>Application</td>
              <td>Draft persistence and submission</td>
            </tr>
          </tbody>
        </table>
      </Prose>
      <ContextualActions>
        <IconButton
          size="small"
          bare
          color="secondary"
          icon="copy"
          aria-label="Copy example"
          onClick={() => {}}
        />
      </ContextualActions>
    </ActionScope>
  );
}

export function SpacingDemo() {
  return (
    <Row gap="large" wrap>
      <BaseView
        data-spacing-four
        jss={{
          padding: "4px 12px 8px 20px",
          background: "var(--light-highlight)",
        }}
      >
        <Text>Four-value padding</Text>
      </BaseView>
      <BaseView
        data-spacing-calc
        jss={{
          padding: "calc(4px + 8px)",
          background: "var(--light-highlight)",
        }}
      >
        <Text>calc() padding</Text>
      </BaseView>
      <BaseView
        data-spacing-logical
        jss={[
          { padding: 0 },
          {
            paddingInline: 16,
            paddingBlock: 8,
            background: "var(--light-highlight)",
          },
        ]}
      >
        <Text>Logical pixel values</Text>
      </BaseView>
    </Row>
  );
}
