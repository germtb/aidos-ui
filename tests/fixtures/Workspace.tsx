import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  JSSProvider,
  TextInput,
  Workspace,
  darkTheme,
  lightTheme,
} from "../../src";

function Fixture() {
  const [open, setOpen] = useState(true);
  return (
    <JSSProvider themes={{ light: lightTheme, dark: darkTheme }}>
      <Button color="secondary" onClick={() => setOpen(!open)}>
        Toggle externally
      </Button>
      <output>{open ? "Navigation open" : "Navigation closed"}</output>
      <Workspace
        navigationTitle="Files"
        navigationOpen={open}
        onNavigationOpenChange={setOpen}
        jss={{ height: 400 }}
        rail={<span>Rail</span>}
        navigation={({ dismissNavigation }) => (
          <>
            <TextInput aria-label="Navigation draft" />
            <Button color="secondary" onClick={dismissNavigation}>
              Select file
            </Button>
          </>
        )}
      >
        <TextInput aria-label="Document draft" />
      </Workspace>
    </JSSProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Fixture />);
