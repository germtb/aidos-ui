import { seconds } from "../../core/World";
import { slimeArchetype } from "../archetypes/SlimeArchetype";
import { zombieArchetype } from "../archetypes/ZombieArchetype";

export const forgottenSwamp = {
  name: "Forgotten swamp",
  archetypes: [slimeArchetype, zombieArchetype],
  cooldown: seconds(2),
  level: 1,
  jitter: 0.1,
  max: 3,
  length: 50,
};
