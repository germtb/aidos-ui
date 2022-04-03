import { ReactNode } from "react";
import { GameComponent } from "./GameComponent";

export enum Position {
  Hero,
  Monster,
  None,
}

export interface IEntity {
  readonly ID: string;
  readonly position: Position;

  getComponents(): Array<GameComponent>;
}

export abstract class Entity implements IEntity {
  private readonly components: Array<GameComponent> = [];
  readonly ID: string;
  readonly position: Position;

  constructor(ID: string, position: Position) {
    this.ID = ID;
    this.position = position;
  }

  getComponents(): GameComponent[] {
    return this.components.slice();
  }

  addComponent(component: GameComponent): void {
    this.components.push(component);
  }

  getComponent<T extends GameComponent>(t: new (...mixed: any) => T): T {
    return this.components.find((c) => c instanceof t) as T;
  }

  removeComponent<T extends GameComponent>(component: T): void {
    const index = this.components.findIndex((c) => c === component);

    if (index !== -1) {
      this.components.splice(index, 1);
    } else {
      throw new Error("Cannot find component for removal");
    }
  }
}
