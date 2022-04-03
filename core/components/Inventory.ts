import { CharacterComponent, GameComponent } from "../GameComponent";
import { Amount, resolveAmount } from "../Amount";
import { INITIAL_ATTRIBUTES, INITIAL_STATS } from "./Stats";
import { Character } from "../entities/Character";

export enum Currency {
  Soul = "Soul",
}

export class InventoryComponent extends CharacterComponent {
  private wallet: Map<Currency, number>;

  constructor(character: Character, wallet: Map<Currency, Amount>) {
    super(character);
    this.wallet = new Map(
      Array.from(wallet.entries()).map(([k, v]) => [
        k,
        resolveAmount(v, {
          level: 0,
          stats: INITIAL_STATS,
          attributes: INITIAL_ATTRIBUTES,
          skills: [],
        }),
      ])
    );
  }

  onStart() {}

  onDestroy() {}

  onFrame() {}

  add(currency: Currency, amount: number) {
    if (!this.wallet.has(currency)) {
      this.wallet.set(currency, 0);
    }
    this.wallet.set(currency, this.wallet.get(currency) + amount);
  }

  get(currency: Currency): number {
    return this.wallet.get(currency) ?? 0;
  }

  trySpend(currency: Currency, amount: number): boolean {
    if (!this.wallet.has(currency)) {
      return false;
    }

    if (this.wallet.get(currency) < amount) {
      return false;
    }

    this.wallet.set(currency, this.wallet.get(currency) - amount);
    return true;
  }

  drop() {
    this.wallet = new Map();
  }
}
