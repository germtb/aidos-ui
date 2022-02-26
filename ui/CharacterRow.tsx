import React from "react";

import { Character } from "../core/entities/Character";
import Circle from "./core/Circle";
import Text from "./core/Text";
import Icon from "./core/Icon";
import ListStaticRow from "./core/ListStaticRow";
import { createJSStyles } from "./core/Palette";
import ProgressBar from "./core/ProgressBar";
import Column from "./core/Column";

const jsStyles = createJSStyles({
  highlight: {
    backgroundColor: "var(--highlight)",
  },
  bar: {
    width: 200,
    alignItems: "center",
  },
});

export const CharacterRow = ({ character }: { character: Character }) => {
  const resources = character.getStats().getResources();

  return (
    <ListStaticRow
      headline={character.archetype.name}
      headlineColor={character.isAlive() ? "secondary" : "subtle"}
      primaryAddOn={
        <Circle spacing="medium">
          <Circle jsStyle={jsStyles.highlight} spacing="small">
            <Icon color="primary" size="medium" icon="eye" />
          </Circle>
        </Circle>
      }
      secondaryAddOn={
        <Column jsStyle={jsStyles.bar} spacing="medium">
          <Text size="small" color="highlight">
            {character.getStats().getCurrentLife()}/
            {character.getStats().getMaxLife()}
          </Text>
          <ProgressBar progress={resources.life.current / resources.life.max} />
        </Column>
      }
    />
  );
};
