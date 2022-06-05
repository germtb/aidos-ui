import React from "react";
import { createRoot } from "react-dom/client";

import DesignBook from "../src/DesignBook";
import { PaletteProvider } from "../src/Palette";

const root = createRoot(document.getElementById("root"));

root.render(
  <PaletteProvider>
    <DesignBook />
  </PaletteProvider>
);
