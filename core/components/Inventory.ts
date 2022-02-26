import { GameComponent } from "../GameComponent";
import { Character } from "../entities/Character";
import { Amount, resolveAmount } from "../Amount";

export enum Currency {
  Soul = "Soul",
}

export class InventoryComponent implements GameComponent {
  private wallet: Map<Currency, number>;

  constructor(wallet: Map<Currency, Amount>) {
    this.wallet = new Map(
      Array.from(wallet.entries()).map(([k, v]) => [
        k,
        resolveAmount(v, {
          level: 0,
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
