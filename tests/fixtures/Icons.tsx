import React from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import {
  DarkModeToggle,
  Icon,
  Providers,
  darkTheme,
  lightTheme,
  type IconType,
} from "aidos-ui";

let root: Root;

function Example({
  names,
  themed = false,
}: {
  names: IconType[];
  themed?: boolean;
}) {
  const content = (
    <React.StrictMode>
      <div
        ref={(element) => {
          if (element)
            fixture.commits.push(element.querySelectorAll("svg").length);
        }}
      >
        {names.map((icon, index) => (
          <Icon
            key={index}
            icon={icon}
            ariaLabel={icon}
            size="medium"
            color="primary"
          />
        ))}
        {themed && <DarkModeToggle />}
      </div>
    </React.StrictMode>
  );
  return themed ? (
    <Providers themes={{ light: lightTheme, dark: darkTheme }}>
      {content}
    </Providers>
  ) : (
    content
  );
}

export const fixture = {
  commits: [] as number[],
  errors: [] as string[],
  preload: () => import("aidos-ui/icons"),
  serverHTML: (themed = false, names: IconType[] = ["check"]) =>
    renderToString(<Example names={names} themed={themed} />),
  mount(hydrate = false, names: IconType[] = ["check"], themed = false) {
    const container = document.getElementById("root")!;
    const element = <Example names={names} themed={themed} />;
    if (hydrate) {
      root = hydrateRoot(container, element, {
        onRecoverableError: (error) => fixture.errors.push(String(error)),
      });
    } else {
      root = createRoot(container);
      root.render(element);
    }
  },
  render: (names: IconType[]) => root.render(<Example names={names} />),
  unmount: () => root.unmount(),
};

if (typeof window !== "undefined")
  Object.assign(window, { iconFixture: fixture });
