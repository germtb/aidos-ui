import { guid } from "../utils/guid";
import { Archetype } from "./Archetype";
import { EncounterComponent } from "./components/Encounter";
import { Wave, WaveComponent } from "./components/Wave";
import { Character } from "./entities/Character";
import { IEntity, Position } from "./Entity";
import { GameComponent } from "./GameComponent";
import { createTime, Time } from "./Time";

export type World = {
  entities: {
    [ID: string]: IEntity;
  };
  time: Time;
};

// Duration of a frame in milliseconds
function FRAME() {
  return 30;
}

export function seconds(time: number) {
  return (time * 1000) / FRAME();
}

export const SHORT_DELAY = seconds(1);

export const MEDIUM_DELAY = seconds(1.5);

export const LONG_DELAY = seconds(3);

export const world: World = {
  entities: {},
  time: createTime({ frame: FRAME() }),
};

export const setFrameTimeout = world.time.setFrameTimeout;

const WAVE = "wave";
const HERO = "hero";
const ENCOUNTER = "encounter";

const encounter = new EncounterComponent();
instantiateComponent(encounter, ENCOUNTER);

export function start() {
  world.time.resume();

  Object.values(world.entities).forEach((entity) => {
    entity.getComponents().forEach((component) => component.onStart());
  });

  world.time.onFrame(() => {
    Object.values(world.entities).forEach((entity) => {
      entity.getComponents().forEach((component) => {
        component.onFrame();
      });
    });
  });
}

export function instantiate(entity: IEntity) {
  if (world.entities[entity.ID]) {
    throw new Error(
      `Cannot instantiate archetype ID is already assigned: ${
        world.entities[entity.ID]
      }`
    );
  }

  world.entities[entity.ID] = entity;

  if (!world.time.isPaused()) {
    world.entities[entity.ID]
      .getComponents()
      .forEach((component) => component.onStart());
  }
}

export function instantiateHero(archetype: Archetype) {
  const character = new Character(archetype, Position.Hero, encounter, 1, HERO);
  instantiate(character);
}

export function instantiateComponent(component: GameComponent, ID = guid()) {
  const entity: IEntity = {
    ID,
    getComponents: () => [component],
    position: Position.None,
  };
  instantiate(entity);
}

export function instantiateWave(wave: Wave) {
  const component = new WaveComponent(encounter, wave);
  instantiateComponent(component, WAVE);
}

export function destroy(ID: string): void {
  world.entities[ID].getComponents().forEach((component) =>
    component.onDestroy()
  );
  delete world.entities[ID];
}

export function now(): number {
  return world.time.now();
}

export function getHero(): Character | null {
  return (world.entities[HERO] as Character) ?? null;
}

export function getWave(): WaveComponent | null {
  return world.entities[WAVE]
    ? (world.entities[WAVE].getComponents()[0] as WaveComponent)
    : null;
}

export function getEncounter(): EncounterComponent | null {
  return world.entities[ENCOUNTER]
    ? (world.entities[ENCOUNTER].getComponents()[0] as EncounterComponent)
    : null;
}
