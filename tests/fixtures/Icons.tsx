import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { addIcon } from "@iconify/react";
import { Icon } from "../../src/Icon";

export const icon = {
  width: 24,
  height: 24,
  body: '<path d="m9 12 2 2 4-4" />',
};

function Example() {
  return (
    <React.StrictMode>
      <div
        ref={(element) => {
          if (element) fixture.commits.push(!!element.querySelector("svg"));
        }}
      >
        <Icon icon="check" size="medium" color="primary" />
      </div>
    </React.StrictMode>
  );
}

export const fixture = {
  commits: [] as boolean[],
  errors: [] as string[],
  preload: () => addIcon("lucide:check", icon),
  serverHTML: () => renderToString(<Example />),
  mount(hydrate = false) {
    const container = document.getElementById("root")!;
    if (hydrate) {
      hydrateRoot(container, <Example />, {
        onRecoverableError: (error) => fixture.errors.push(String(error)),
      });
    } else {
      createRoot(container).render(<Example />);
    }
  },
};

if (typeof window !== "undefined")
  Object.assign(window, { iconFixture: fixture });
