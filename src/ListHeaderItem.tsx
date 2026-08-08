import React, { ReactNode } from "react";
import { BaseListItem } from "./BaseListItem";
import { IconType } from "./IconType";
import { Position, Size } from "./jss";

export function ListHeaderItem({
  highlight,
  headline,
  body,
  icon,
  iconPosition,
  iconSize,
  addOn,
}: {
  highlight?: boolean;
  headline: string;
  body?: string;
  icon?: IconType;
  iconPosition?: Position;
  iconSize?: Size;
  addOn?: ReactNode;
}) {
  return (
    <BaseListItem
      headline={headline}
      headlineColor={highlight ? "highlight" : "primary"}
      headlineBold={true}
      body={body}
      icon={icon}
      iconPosition={iconPosition}
      iconSize={iconSize}
      addOn={addOn}
    >
      {({ content }) => content}
    </BaseListItem>
  );
}
