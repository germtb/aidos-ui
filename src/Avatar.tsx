import React, { ReactNode, useState } from "react";

import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
import { Span } from "./Text";
import { hash } from "./hash";
import { JSS, Size, cssVar } from "./jss";

export type AvatarSize = "small" | "medium" | "large";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  badge?: ReactNode;
  jss?: JSS;
}

const dimensions: Record<AvatarSize, number> = {
  small: 24,
  medium: 34,
  large: 48,
};

const textSizes: Record<AvatarSize, Size> = {
  small: "small",
  medium: "medium",
  large: "large",
};

function normalizeName(name: string): string {
  return name.normalize("NFKC").trim();
}

function getInitial(name: string): string | null {
  const normalized = normalizeName(name);
  if (normalized === "") return null;

  const meaningfulCharacter = normalized.match(/[\p{L}\p{N}]/u)?.[0];
  const character = meaningfulCharacter ?? Array.from(normalized)[0];
  return Array.from(character.toLocaleUpperCase())[0] ?? null;
}

const avatarPalettes = [
  ["#eed1cf", "#baa1cf"],
  ["#efd5bd", "#9ebbd2"],
  ["#e6d9b9", "#c4a0b6"],
  ["#ceddc5", "#a7abd1"],
  ["#c6ded8", "#d6aaa9"],
  ["#c9dbea", "#d8ae8c"],
  ["#d0d2ea", "#a8c09d"],
  ["#ddcde9", "#c8b887"],
  ["#e6ccdc", "#97bdb4"],
] as const;

const avatarTextColor = "rgb(42, 45, 52)";

function getGradient(name: string): string {
  const seed = hash(normalizeName(name).toLocaleLowerCase());
  const palette = avatarPalettes[seed % avatarPalettes.length];

  return `radial-gradient(circle at 24% 20%, ${palette[0]} 0%, transparent 68%), radial-gradient(circle at 82% 80%, ${palette[1]} 0%, transparent 72%), linear-gradient(145deg, #e5e1e6, #c9c5ce)`;
}

export const Avatar = React.forwardRef(function Avatar(
  { name, src, size = "medium", badge, jss }: AvatarProps,
  ref?: React.Ref<HTMLElement>,
) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const dimension = dimensions[size];
  const initial = getInitial(name);
  const showImage = src != null && src !== "" && failedSrc !== src;

  return (
    <BaseView
      ref={ref}
      tag="span"
      role="img"
      aria-label={name || "User"}
      jss={[
        {
          position: "relative",
          display: "inline-flex",
          width: dimension,
          height: dimension,
          flex: `0 0 ${dimension}px`,
          verticalAlign: "middle",
        },
        jss,
      ]}
    >
      <BaseView
        tag="span"
        jss={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "50%",
          background: getGradient(name),
          color: avatarTextColor,
          userSelect: "none",
        }}
      >
        {initial == null ? (
          <Icon
            icon="user"
            size={textSizes[size]}
            color="light"
            jss={{ color: avatarTextColor }}
          />
        ) : (
          <Span
            size={textSizes[size]}
            color="light"
            bold
            aria-hidden="true"
            jss={{ color: avatarTextColor, lineHeight: 1 }}
          >
            {initial}
          </Span>
        )}
        {showImage && (
          <img
            key={src}
            ref={(image) => {
              if (image?.complete && image.naturalWidth === 0) {
                setFailedSrc(src);
              }
            }}
            src={src}
            alt=""
            draggable={false}
            onError={() => setFailedSrc(src)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </BaseView>
      {badge != null && (
        <BaseView
          tag="span"
          aria-hidden="true"
          jss={{
            position: "absolute",
            right: "14.65%",
            bottom: "14.65%",
            display: "flex",
            borderRadius: "50%",
            boxShadow: `0 0 0 2px ${cssVar("--overlay-background")}`,
            pointerEvents: "none",
            transform: "translate(50%, 50%)",
          }}
        >
          {badge}
        </BaseView>
      )}
    </BaseView>
  );
});

Avatar.displayName = "Avatar";
