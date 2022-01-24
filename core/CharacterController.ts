import { Input } from "./Input";
import { vector } from "./Vector";
import { World, move } from "./World";

export const createCharacterController = ({
  characterID,
  input,
  world,
}: {
  characterID: string;
  input: Input;
  world: World;
}) => {
  const subscriptions = [];

  subscriptions.push(
    input.onUp(() => {
      move(characterID, vector(0, +1), world);
    })
  );

  subscriptions.push(
    input.onDown(() => {
      move(characterID, vector(0, -1), world);
    })
  );

  subscriptions.push(
    input.onLeft(() => {
      move(characterID, vector(-1, 0), world);
    })
  );

  subscriptions.push(
    input.onRight(() => {
      move(characterID, vector(+1, 0), world);
    })
  );

  world.subscriptions[characterID].push(...subscriptions);

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
};
