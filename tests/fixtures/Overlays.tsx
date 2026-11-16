import React, { useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import {
  Button,
  Composer,
  Select,
  Menu,
  MenuItem,
  Modal,
  SearchList,
  Tabs,
  JSSProvider,
  PopoverTrigger,
  Tooltip,
  darkTheme,
  lightTheme,
} from "../../src";

function Fixture() {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState("Draft");
  const [result, setResult] = useState("");
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [choice, setChoice] = useState("one");
  return (
    <JSSProvider themes={{ light: lightTheme, dark: darkTheme }}>
      <div style={{ padding: 32 }}>
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
