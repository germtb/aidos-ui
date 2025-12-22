import { BaseView } from "./BaseView";
import { Column } from "./Column";
import { Color, JSStyle, getBackground } from "./jss";

export function MenuIcon({ open, color }: { open: boolean; color: Color }) {
  return (
    <Column gap="small">
      <Bar
        color={color}
        jss={{
          transform: open ? "rotateZ(135deg)" : "",
          transformOrigin: "center",
          top: open ? 8 : 0,
        }}
      />
      <Bar
        color={color}
        jss={{
          opacity: open ? 0 : 1,
        }}
      />
      <Bar
        color={color}
        jss={{
          transform: open ? "rotateZ(-135deg)" : "",
          transformOrigin: "center",
          top: open ? -8 : 0,
        }}
      />
    </Column>
  );
}

function Bar({ jss, color }: { jss: JSStyle; color: Color }) {
  return (
    <BaseView
      jss={[
        {
          position: "relative",
          width: 24,
          height: 4,
          borderRadius: "1px",
          transition: "all 200ms ease-out",
        },
        getBackground(color),
        jss,
      ]}
    />
  );
}
