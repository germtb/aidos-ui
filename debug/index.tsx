import React from "react";
import { render } from "react-dom";

import { createCharacterController } from "../core/CharacterController";
import { createInput } from "../core/Input";
import { destroy, instantiateCharacter, World } from "../core/World";
import { createTime } from "../core/Time";
import { runSkillLoopFrame } from "../core/SkillLoop";
import { runEffects } from "../core/Effect";
import { Root } from "../graphics/Root";
import { characterArchetype } from "../content/archetypes/CharacterArchetype";
import { Entity } from "../core/Entity";
import { runControllerFrame } from "../core/Controller";
import { runMovements } from "../core/Movement";
import { Vector, vector } from "../core/Vector";
import { rectangle } from "../core/Rectangle";
import { slimeArchetype } from "../content/archetypes/SlimeArchetype";

const LOGIC_FRAME = 500; // 500ms
const RENDER_FRAME = 16; // 16ms

console.log("---STARTING---");

const logicTime = createTime({ frame: LOGIC_FRAME });
const renderTime = createTime({ frame: RENDER_FRAME });

const world: World = {
  elements: {},
  positions: {},
  subscriptions: {},
  time: logicTime,
  pieces: [
    rectangle(vector(0, 0), 5, 5),
    rectangle(vector(2, 5), 5, 5),
    rectangle(vector(4, 10), 5, 5),
  ],
};

export const HERO = "hero";

world.time.onFrame(() => {
  Object.values(world.elements).forEach((object) => {
    if (object.entity === Entity.character) {
      runControllerFrame(object, world);
    }
  });
  Object.values(world.elements).forEach((object) => {
    if (object.entity === Entity.character) {
      runMovements(object, world);
    }
  });
  Object.values(world.elements).forEach((object) => {
    if (object.entity === Entity.character) {
      runSkillLoopFrame(object, world);
    }
  });
  Object.values(world.elements).forEach((object) => {
    if (object.entity === Entity.character) {
      runEffects(object, world);
    }
  });
  Object.values(world.elements).forEach((object) => {
    if (object.entity === Entity.character) {
      if (object.resources.health.value === 0) {
        destroy(object.ID, world);
      }
    }
  });
});

const character = instantiateCharacter(
  characterArchetype,
  vector(0, 0),
  world,
  Vector.UP,
  1,
  HERO
);

for (let i = 0; i < 1; i++) {
  instantiateCharacter(slimeArchetype, vector(1, i), world);
}

const input = createInput(renderTime);

createCharacterController({
  characterID: character.ID,
  input,
  world,
});

const root = document.getElementById("root");

render(
  <Root
    getWorld={() => {
      return world;
    }}
  />,
  root
);
