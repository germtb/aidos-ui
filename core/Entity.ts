import { ReactNode } from "react";
import { GameComponent } from "./GameComponent";

export enum Position {
  Hero,
  Monster,
  None,
}

export interface Entity {
  readonly ID: string;
  readonly position: Position;

  getComponents(): Array<GameComponent>;
}
