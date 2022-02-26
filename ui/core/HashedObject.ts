import { guid } from "../../utils/guid";

export type HashedObject<T> = {
  value: T;
  hash: string;
};

function createHashedObject<T>(value: T): HashedObject<T> {
  return {
    value,
    hash: guid(),
  };
}
