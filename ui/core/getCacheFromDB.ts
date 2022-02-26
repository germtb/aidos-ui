import getDB from "./getDB";
import { Cache, CACHE_VERSION } from "./GraphQLClient";
import { DBCache } from "./saveCacheToDB";

export default async function getCacheFromDB(): Promise<Cache> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["CACHE"], "readonly");

    transaction.onerror = (event) => {
      db.close();
      reject(event);
    };

    const objectStore = transaction.objectStore("CACHE");

    const get = objectStore.get(CACHE_VERSION);

    get.onsuccess = (event) => {
      // @ts-ignore TODO: no idea how to fix this
      const result: DBCache = event.target.result;
      resolve(result ? JSON.parse(result.value) : null);
      db.close();
    };

    get.onerror = (event) => {
      reject(event);
    };
  });
}
