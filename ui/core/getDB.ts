export default async function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("Flashcards", 3);

    request.onerror = (event) => {
      console.error("Error while requesting DB");
      reject(event);
    };

    request.onupgradeneeded = (event) => {
      console.log("Upgrading DB");

      // @ts-ignore
      const db: IDBDatabase = event.target.result;

      // Until this hits a stable point
      try {
        db.deleteObjectStore("CACHE");
      } catch (e) {}

      // Cards object store
      const cardsStore = db.createObjectStore("CACHE", {
        keyPath: "key",
      });
      cardsStore.createIndex("value", "value");
      cardsStore.createIndex("key", "key", { unique: true });
    };

    request.onsuccess = (event) => {
      console.log("DB successfully requested");
      // @ts-ignore
      const db: IDBDatabase = event.target.result;
      resolve(db);
    };
  });
}
