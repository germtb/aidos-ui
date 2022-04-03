import React from "react";

import Box from "./Box";
import { createJSStyles } from "./Palette";
import ProgressBar from "./ProgressBar";
import ListStaticRow from "./ListStaticRow";
import { Character } from "../../core/entities/Character";

const jsStyles = createJSStyles({
  progressBar: {
    width: 200,
  },
  spacer: {
    flexGrow: 1,
  },
  list: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 0,
  },
});

export default function Loop({ hero }: { hero: Character }) {
  return (
    <>
      {hero
        .getSkills()
        .getActiveSkills()
        .map((skill, index) => {
          return (
            <ListStaticRow
              key={`${skill.ID}-${index}`}
              headline={skill.name}
              headlineSize="medium"
              secondaryAddOn={
                hero.getSkills().getPointer() === index ? (
                  <Box jsStyle={jsStyles.progressBar} spacing="medium">
                    <ProgressBar progress={hero.getSkills().getProgress()} />
                  </Box>
                ) : undefined
              }
            />
          );
        })}
    </>
  );
}
