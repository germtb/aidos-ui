import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AdaptiveSplitView,
  Button,
  JSSProvider,
  TextInput,
  darkTheme,
  lightTheme,
} from "../../src";

function Fixture() {
  const [open, setOpen] = useState(false);
  const [equal, setEqual] = useState(false);
  const [document, setDocument] = useState(0);
  return (
    <JSSProvider themes={{ light: lightTheme, dark: darkTheme }}>
      <Button color="secondary" onClick={() => setEqual(true)}>
        Equal panes
      </Button>
      <Button
        color="secondary"
        onClick={() => {
          setDocument(document + 1);
          setOpen(!open);
        }}
      >
        Switch document
      </Button>
      <AdaptiveSplitView
        transitionKey={document}
        panelTitle="Inspector"
        panelHeader={<span>Custom heading</span>}
        panelWidth={equal ? "50%" : undefined}
        minContentWidth={equal ? 400 : undefined}
        showPanelCloseButton={false}
        open={open}
        onOpenChange={setOpen}
        jss={{ height: 400 }}
        panel={<TextInput aria-label="Panel draft" />}
      >
        <TextInput aria-label="Document draft" />
      </AdaptiveSplitView>
    </JSSProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Fixture />);
