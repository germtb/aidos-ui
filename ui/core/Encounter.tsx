import React, { useEffect, useState } from "react";

import ListSpacer from "./ListSpacer";
import ListDivider from "./ListDivider";
import { createJSStyles } from "./Palette";
import { Character } from "../../core/entities/Character";
import { CharacterRow } from "../CharacterRow";
import BaseView from "./BaseView";
import ListStaticHeaderRow from "./ListStaticHeaderRow";
import { EncounterComponent } from "../../core/components/Encounter";
import { world } from "../../core/World";

const jsStyles = createJSStyles({
  spacer: {
    flexGrow: 1,
  },
  list: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 0,
  },
});

export default function Encounter({
  name,
  encounter,
}: {
  name: string;
  encounter: EncounterComponent;
}) {
  const monsters = encounter.getMonsterSide();
  const heroes = encounter.getHeroSide();

  return (
    <>
      <ListSpacer />
      <ListStaticHeaderRow label={name} />

      {monsters.map((entity) => {
        return <CharacterRow key={entity.ID} character={entity as Character} />;
      })}

      <BaseView jsStyle={jsStyles.spacer} />

      <ListDivider />

      {heroes.map((entity) => {
        return <CharacterRow key={entity.ID} character={entity as Character} />;
      })}

      <ListSpacer />
      <ListDivider />
    </>
  );
}
