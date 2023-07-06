import { DataType, Property } from "csstype";
import { BaseView } from "./BaseView";

export type Radial = {
  inner: DataType.Color;
  outer: DataType.Color;
  position?: Property.BackgroundPosition | Property.TransformOrigin;
  endingShape?: "circle" | "ellipse";
  size?:
    | "closest-side"
    | "closest-corner"
    | "farthest-side"
    | "farthest-corner";
};

export function Gradient({
  children,
  radials,
}: {
  children: JSX.Element;
  radials: Radial[];
}) {
  return <BaseView style={}>{children}</BaseView>;
}
