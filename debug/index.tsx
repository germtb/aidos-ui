import React from "react";
import { createRoot } from "react-dom/client";

import { DesignBook } from "../src/DesignBook";
import { PaletteProvider } from "../src/Palette";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Could not find #root");
}

const reactRoot = createRoot(root);

reactRoot.render(
  <PaletteProvider>
    <DesignBook />
  </PaletteProvider>
);
