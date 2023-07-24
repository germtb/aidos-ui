import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useState, useCallback, useEffect, createContext, useRef, } from "react";
import { createEmitter } from "./Emitter";
const VERSION = 1;
export function createStorage({ initialState, name = "aidos-storage", }) {
    const StorageContext = createContext({
        subscribe: () => {
            throw new Error("Not implemented");
        },
        mutate: () => {
            throw new Error("Not implemented");
        },
        persist: () => {
            throw new Error("Not implemented");
        },
    });
    const state = { current: initialState };
    function Storage({ children }) {
        const emitterRef = useRef(createEmitter());
        const subscribe = useCallback((callback) => {
            return emitterRef.current.subscribe(callback);
        }, []);
        const mutate = useCallback((mutator) => {
            state.current = mutator(state.current);
            emitterRef.current.emit(state.current);
        }, []);
        const persist = useCallback(async () => {
            const s = JSON.stringify(state.current);
            const bytes = new TextEncoder().encode(s);
            const blob = new Blob([bytes], {
                type: "application/json;charset=utf-8",
            });
            return saveBlob(blob);
        }, []);
        useEffect(() => {
            getBlob().then((blob) => {
                if (blob == null) {
                    return;
                }
                const fr = new FileReader();
                fr.onload = (event) => {
                    const text = event.target.result.toString();
                    state.current = JSON.parse(text);
                    emitterRef.current.emit(state.current);
                };
                fr.onerror = (error) => {
                    // reject(error);
                };
                fr.readAsText(blob);
            });
        }, []);
        return (_jsx(StorageContext.Provider, { value: {
                subscribe,
                mutate,
                persist,
            }, children: children }));
    }
    function useStorage(selector) {
        const [localState, setLocalState] = useState(() => selector(state.current));
        const { subscribe } = React.useContext(StorageContext);
        useEffect(() => {
            return subscribe((newState) => {
                const newLocalState = selector(newState);
                if (newLocalState != localState) {
                    setLocalState(selector(newState));
                }
            });
        }, []);
        return localState;
    }
    function useMutation() {
        const { mutate } = React.useContext(StorageContext);
        return mutate;
    }
    function usePersist() {
        const { persist } = React.useContext(StorageContext);
        return persist;
    }
    const dbPromise = new Promise((resolve, reject) => {
        const request = window.indexedDB.open(name, VERSION);
        request.onerror = (event) => {
            reject(event);
        };
        request.onupgradeneeded = (event) => {
            // @ts-ignore
            const db = event.target.result;
            const table = db.createObjectStore("blobs", {
                keyPath: "key",
            });
            table.createIndex("key", "key", { unique: true });
        };
        request.onsuccess = (event) => {
            // @ts-ignore
            const db = event.target.result;
            resolve(db);
        };
    });
    const getBlob = async () => {
        const db = await dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["blobs"]);
            const objectStore = transaction.objectStore("blobs");
            const get = objectStore.get(1);
            transaction.onerror = (event) => {
                db.close();
                reject(event);
            };
            get.onsuccess = (event) => {
                // @ts-ignore
                const result = event.target.result;
                if (result && result.blob) {
                    resolve(result.blob);
                }
                else {
                    resolve(null);
                }
                db.close();
            };
            get.onerror = (event) => {
                reject(event);
            };
        });
    };
    const saveBlob = async (blob) => {
        const db = await dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["blobs"], "readwrite");
            transaction.oncomplete = () => {
                db.close();
                resolve();
            };
            transaction.onerror = (event) => {
                db.close();
                reject(event);
            };
            const objectStore = transaction.objectStore("blobs");
            objectStore.put({ blob, key: 1 });
        });
    };
    return {
        Storage,
        useStorage,
        useMutation,
        usePersist,
    };
}
//# sourceMappingURL=Storage.js.map