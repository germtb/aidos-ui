import React, { useEffect, useState } from "react";
import { Character } from "../core/Character";
import { Entity } from "../core/Entity";
import { subscribe } from "../core/UIEvent";
import { vector } from "../core/Vector";
import { World } from "../core/World";
import { HERO } from "../debug";
import { Bar } from "./Bar";
import { CELL, Cell } from "./Cell";
import { Rectangle } from "./Rectangle";
import { SkillLoop } from "./SkillLoop";

export const Root = ({ getWorld }: { getWorld: () => World }) => {
  const [world, setWorld] = useState(getWorld);

  useEffect(() => {
    return subscribe("elementUpdate", (_elementUpdate) => {
      setWorld({ ...getWorld() });
    });
  }, []);

  // @ts-expect-error
  const hero: Character = world.elements[HERO];
  const camera = vector(4.5, 8).substract(hero.position);

  return (
    <div
      id="uiRoot"
      style={{
        position: "relative",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        width: 480,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 14, marginBottom: 1 }}>
        <Bar
          color="red"
          ratio={hero.resources.health.value / hero.resources.health.max}
        />
      </div>
      <div style={{ height: 14, marginBottom: 1 }}>
        <Bar
          color="green"
          ratio={hero.resources.stamina.value / hero.resources.stamina.max}
        />
      </div>
      <div style={{ height: 14, marginBottom: 1 }}>
        <Bar
          color="blue"
          ratio={hero.resources.stamina.value / hero.resources.stamina.max}
        />
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: 480,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexGrow: 1,
            width: 480,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
            transform: `translate(${camera.x * CELL}px, ${-camera.y * CELL}px)`,
            transition: "transform ease-out 0.5s",
            willChange: "transform",
          }}
        >
          {Object.values(world.pieces).map((piece, i) => (
            <Rectangle rect={piece} key={i} />
          ))}
          {Object.values(world.elements).map((element) => (
            <Cell element={element} key={element.ID} />
          ))}
        </div>
      </div>

      <div
        id="loop"
        style={{
          marginTop: "auto",
        }}
      >
        {hero.entity === Entity.character && <SkillLoop loop={hero.loop} />}
      </div>
    </div>
  );
};
