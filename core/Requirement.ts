import { Amount, resolveAmount } from "./Amount";
import { Attributes } from "./components/Stats";
import { Context } from "./Context";
import { Skill } from "./Skill";

export type Requirement =
  | {
      type: "stat";
      stat: keyof Attributes;
      amount: Amount;
    }
  | {
      type: "level";
      amount: Amount;
    }
  | {
      type: "skill";
      skill: Skill;
    }
  | Array<Requirement>;

export function resolveRequirement(
  requirement: Requirement,
  context: Context
): boolean {
  if (Array.isArray(requirement)) {
    return requirement.every((r) => resolveRequirement(r, context));
  }

  switch (requirement.type) {
    case "stat":
      return (
        resolveAmount(requirement.amount, context) >=
        context.stats[requirement.stat]
      );
    case "level":
      return resolveAmount(requirement.amount, context) >= context.level;
    case "skill":
      return context.skills.some((skill) => skill.ID === requirement.skill.ID);
  }
}
