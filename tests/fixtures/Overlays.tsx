import React, { useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import {
  Button,
  Composer,
  Select,
  Menu,
  MenuItem,
  MenuSubmenu,
  Column,
  TextInput,
  Span,
  Modal,
  SearchList,
  Tabs,
  JSSProvider,
  PopoverTrigger,
  Tooltip,
  darkTheme,
  lightTheme,
} from "../../src";

function SubmenuFixture() {
  const [effort, setEffort] = useState("High");
  const [provider, setProvider] = useState("One");
  const [model, setModel] = useState("draft-model");
  const [choice, setChoice] = useState("one");
  return (
    <PopoverTrigger
      ariaLabel="Settings pages"
      content={({ close }) => (
        <Column gap="small" jss={{ width: 300, maxWidth: "100%" }}>
          <TextInput aria-label="Settings filter" defaultValue="" />
          <Menu label="Settings" onClose={close} jss={{ maxHeight: 140 }}>
            <MenuSubmenu label="Unavailable" trailing="Offline" disabled>
              <span>Must not open</span>
            </MenuSubmenu>
            {Array.from({ length: 5 }, (_, index) => (
              <MenuItem key={index} onClick={() => {}}>
                Action {index + 1}
              </MenuItem>
            ))}
            <MenuSubmenu label="Reasoning" trailing={effort}>
              <Menu label="Reasoning effort">
                <MenuItem
                  role="menuitemradio"
                  checked={effort === "Low"}
                  onClick={(event) => {
                    event.preventDefault();
                    setEffort("Low");
                  }}
                >
                  Low
                </MenuItem>
                <MenuItem
                  role="menuitemradio"
                  checked={effort === "High"}
                  onClick={() => setEffort("High")}
                >
                  High
                </MenuItem>
              </Menu>
            </MenuSubmenu>
            <MenuSubmenu label="Provider" trailing={provider}>
              {({ back }) => (
                <Menu label="Provider choices" onClose={back}>
                  <MenuItem onClick={() => setProvider("Two")}>Two</MenuItem>
                </Menu>
              )}
            </MenuSubmenu>
            <MenuSubmenu label="Advanced">
              <Menu label="Advanced options">
                <MenuSubmenu label="Custom model">
                  <Column gap="small">
                    <TextInput
                      label="Custom model ID"
                      value={model}
                      onValueChange={setModel}
                    />
                    <Select
                      label="Model connection"
                      value={choice}
                      onValueChange={setChoice}
                      options={[
                        { value: "one", label: "One" },
                        { value: "two", label: "Two" },
                      ]}
                    />
                    <Button color="primary" onClick={close}>
                      Done
                    </Button>
                  </Column>
                </MenuSubmenu>
                <MenuItem
                  title="Advanced configuration help"
                  onClick={() => {}}
                >
                  About
                </MenuItem>
              </Menu>
            </MenuSubmenu>
          </Menu>
        </Column>
      )}
    >
      {({ toggle }) => (
        <Button color="secondary" onClick={() => toggle()}>
          Open settings pages
        </Button>
      )}
    </PopoverTrigger>
  );
}

function Fixture() {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState("Draft");
  const [result, setResult] = useState("");
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [choice, setChoice] = useState("one");
  const [folder, setFolder] = useState("");
  return (
    <JSSProvider themes={{ light: lightTheme, dark: darkTheme }}>
      <div style={{ padding: 32 }}>
        <SubmenuFixture />
        <div style={{ position: "fixed", bottom: 20, right: 20 }}>
          <PopoverTrigger
            ariaLabel="Folder picker"
            placement="top"
            align="end"
            content={({ close }) => (
              <Menu
                label="Folders"
                onClose={close}
                jss={{ width: 220, maxHeight: 220 }}
              >
                <MenuItem onClick={() => setFolder("Recent")}>Recent</MenuItem>
                <MenuItem
                  onClick={() => setFolder("Long")}
                  aria-describedby="folder-context"
                >
                  <strong>
                    {"/workspaces/" + "long-directory-name-".repeat(12)}
                  </strong>
                </MenuItem>
                <MenuItem disabled onClick={() => setFolder("Disabled")}>
                  /workspaces/disabled-folder-with-a-long-name
                </MenuItem>
                <MenuItem
                  description="Choose a folder on disk"
                  onClick={() => {}}
                >
                  Browse
                </MenuItem>
                <MenuItem
                  title="Custom workspace hint"
                  description="Not the override"
                  onClick={() => {}}
                >
                  Custom
                </MenuItem>
                <MenuItem title="" onClick={() => {}}>
                  /workspaces/suppressed-folder-with-a-long-name
                </MenuItem>
                <MenuItem
                  description="Not available offline"
                  disabled
                  onClick={() => setFolder("Offline")}
                >
                  /workspaces/offline-folder-with-a-long-name
                </MenuItem>
              </Menu>
            )}
          >
            {({ toggle }) => (
              <Button color="secondary" onClick={() => toggle()}>
                Choose folder
              </Button>
            )}
          </PopoverTrigger>
        </div>
        <span id="folder-context" hidden>
          Recently used
        </span>
        <output aria-label="Chosen folder">{folder}</output>
        <input
          aria-label="Draft"
          defaultValue="Keep this draft"
          onKeyDown={(event) => {
            if (event.key === "F2") setModal(true);
          }}
        />
        <Modal
          open={modal}
          label="Search dialog"
          onClose={() => setModal(false)}
          onAfterClose={() => document.execCommand("selectAll")}
        >
          <input aria-label="Modal search" autoFocus />
          <Select
            label="Provider"
            value={choice}
            onValueChange={setChoice}
            options={[
              { value: "one", label: "One" },
              { value: "two", label: "Two" },
            ]}
          />
          <button onClick={() => setModal(false)}>Select draft</button>
        </Modal>
        <button
          onClick={() => {
            document
              .querySelector<HTMLElement>("[popover]:popover-open")
              ?.hidePopover();
            flushSync(() => setCount((value) => value + 1));
          }}
        >
          Dismiss and update
        </button>
        <div
          id="clip"
          style={{
            width: 220,
            height: 100,
            overflow: "auto",
            transform: "translateZ(0)",
            marginTop: 24,
          }}
        >
          <Tooltip
            content="The complete commit title remains readable outside a narrow scrolling sidebar"
            jss={{ display: "block" }}
          >
            <Button color="secondary">Commit title</Button>
          </Tooltip>
          <PopoverTrigger
            ariaLabel="Options"
            content={<span>Update {count}</span>}
          >
            {({ toggle, expanded }) => (
              <Button
                color="secondary"
                aria-expanded={expanded}
                onClick={() => toggle()}
              >
                Open options
              </Button>
            )}
          </PopoverTrigger>
          <div style={{ height: 500 }} />
        </div>
        <Tabs
          variant="document"
          aria-label="Documents"
          aria-controls="document"
          tabs={[
            {
              id: "draft",
              label: "Draft",
              selected: selected === "Draft",
              onClick: () => setSelected("Draft"),
              onClose: () => {},
            },
            {
              id: "other",
              label: "Other",
              selected: selected === "Other",
              onClick: () => setSelected("Other"),
            },
          ]}
        />
        <SearchList
          label="Search"
          inputProps={{ "aria-label": "Find document", maxLength: 32 }}
          options={[
            { value: "alpha", label: "Alpha" },
            { value: "beta", label: "Beta" },
          ]}
          onSelect={setResult}
          renderOption={(option) => <span>Document: {option.label}</span>}
        />
        <span role="status">{result}</span>
        <Composer
          aria-label="Message"
          footer={
            <Tooltip content="Model context used" jss={{ marginLeft: "auto" }}>
              <Span size="xsmall" tabIndex={0} aria-label="37% context used">
                37%
              </Span>
            </Tooltip>
          }
          value={draft}
          onValueChange={setDraft}
          onSubmit={() => {
            setSubmitted(draft);
            setDraft("");
          }}
        />
        <output aria-label="Submitted message">{submitted}</output>
        {result && (
          <Menu autoFocus label="Document actions">
            <MenuItem onClick={() => {}}>Inspect {result}</MenuItem>
          </Menu>
        )}
      </div>
    </JSSProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Fixture />
  </React.StrictMode>,
);
