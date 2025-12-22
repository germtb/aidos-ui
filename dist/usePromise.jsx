import { useState, useEffect } from "react";
export function usePromise(promiseFactory, inputs, initialValue) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(null);
    useEffect(() => {
        promiseFactory()
            .then((value) => setValue(value))
            .catch((error) => setError(error));
    }, inputs);
    return [value, error];
}
//# sourceMappingURL=usePromise.jsx.map