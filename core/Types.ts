import { Amount } from "./Amount";

export type Incoming<T> = T & {
  amount: number;
};

export type Outgoing<T> = T & {
  amount: Amount;
};
