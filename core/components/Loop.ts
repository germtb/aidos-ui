import { skillMap } from "../../content/skills/SkillMap";
import { GameComponent } from "../GameComponent";
import { Character } from "../entities/Character";
import { resolveEffect } from "../Effect";
import { ActiveSkill } from "../Skill";
import { Target } from "../Target";
import { Currency } from "./Inventory";
import { EncounterComponent } from "./Encounter";

export class LoopComponent implements GameComponent {
  private castTime: number = 0;
  private pointer: number = 0;
  private capacity: number;
  private readonly skills: Array<{ skill: ActiveSkill; active: boolean }> = [];
  private readonly character: Character;
  private readonly encounter: EncounterComponent;

  constructor(character: Character, encounter: EncounterComponent) {
    this.character = character;
    this.skills = character.archetype.loop.skills.map((skill) => ({
      skill,
      active: true,
    }));
    this.capacity = character.archetype.loop.capacity;
    this.encounter = encounter;
  }

  onStart() {}

  onFrame() {
    // Return early if the character is dead
    if (!this.character.isAlive()) {
      this.pointer = 0;
      return;
    }

    // Return early if there are no enemies. Reset the loop
    if (this.encounter.getOtherSide(this.character).length === 0) {
      this.pointer = 0;
      return;
    }

    const skill = this.getCurrentSkill();

    // If there are no available skills
    if (!skill) {
      this.pointer = 0;
      return;
    }

    const skillArchetype = skillMap[skill.ID];

    if (this.castTime < skillArchetype.castTime) {
      this.castTime++;
      return;
    }

    const didActivate = tryActivateSkill(skill, this.character, this.encounter);

    if (didActivate) {
      this.castTime = 0;
      this.pointer += 1;

      // Loop back to first skill if we are pointing outside the loop
      if (this.pointer >= this.getActiveSkills().length) {
        this.pointer = 0;
      }
    }
  }

  onDestroy() {}

  addSkill(skill: ActiveSkill) {
    this.skills.push({ skill, active: false });
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  activateSkill(index: number) {
    if (index > this.skills.length) {
      return;
    }

    if (this.getActiveSkills().length > this.capacity) {
      return;
    }

    this.skills[index].active = true;
  }

  deactivateSkill(index: number) {
    if (index > this.skills.length) {
      return;
    }

    this.skills[index].active = false;
  }

  getActiveSkills() {
    return this.skills.filter(({ active }) => active).map(({ skill }) => skill);
  }

  getCurrentSkill(): ActiveSkill | null {
    if (this.pointer >= this.getActiveSkills().length) {
      return null;
    }

    return this.getActiveSkills()[this.pointer];
  }

  getProgress(): number {
    const currentSkill = this.getCurrentSkill();

    if (currentSkill == null) {
      return 0;
    }

    return this.castTime / skillMap[currentSkill.ID].castTime;
  }

  getPointer(): number {
    return this.pointer;
  }
}

function tryActivateSkill(
  skill: ActiveSkill,
  character: Character,
  encounter: EncounterComponent
): boolean {
  const skillArchetype = skillMap[skill.ID];
  const cost = skillArchetype.cost;
  const targets = findTarget(skillArchetype.targetMode, encounter, character);

  if (targets.length === 0) {
    return false;
  }

  if (
    cost.type === "none" ||
    character.getStats().trySpend(cost.type, cost.amount)
  ) {
    const effect = resolveEffect(skillArchetype.effect, {
      character,
      level: skill.level,
    });

    for (const target of targets) {
      target.getStats().receiveEffect(effect);
      if (target.getStats().getCurrentLife() <= 0) {
        // TODO this wont work with multiple currencies
        character
          .getInventory()
          .add(Currency.Soul, target.getInventory().get(Currency.Soul));
        target.getInventory().drop();
        target.die();
      }
    }
    return true;
  } else {
    return false;
  }
}

function findTarget(
  targetMode: Target,
  encounter: EncounterComponent,
  character: Character
): Character[] {
  switch (targetMode.type) {
    case "foesInRange":
      return encounter.getOtherSide(character).slice(0, targetMode.range);
    case "furthestFoe":
      const index = Math.min(
        encounter.getOtherSide(character).length - 1,
        targetMode.range
      );
      return encounter.getOtherSide(character).slice(index, index + 1);
    case "nearestFoe":
      return encounter.getOtherSide(character).slice(0, 1);
    case "self":
      return [character];
  }
}
