import getDB from "./getDB";
import { CACHE_VERSION } from "./GraphQLClient";
import { Cache } from "./GraphQLClient";

export type DBCache = {
  value: string;
  key: string;
};

export default async function saveCacheToDB(cache: Cache): Promise<void> {
  const db = await getDB();
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction(["CACHE"], "readwrite");

    transaction.oncomplete = () => {
      console.log("Saved cache to DB");
      db.close();
      resolve();
    };

    transaction.onerror = (event) => {
      db.close();
      reject(event);
    };

    const objectStore = transaction.objectStore("CACHE");
    const dbCache: DBCache = {
      key: CACHE_VERSION,
      value: JSON.stringify(cache),
    };
    objectStore.put(dbCache);
  });
}
