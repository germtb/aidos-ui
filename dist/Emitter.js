export function createEmitter() {
    const subscriptions = new Set();
    const subscribe = (callback) => {
        subscriptions.add(callback);
        return () => {
            subscriptions.delete(callback);
        };
    };
    const emit = (value) => {
        subscriptions.forEach((subscription) => {
            subscription(value);
        });
    };
    return {
        subscribe,
        emit,
    };
}
//# sourceMappingURL=Emitter.js.map