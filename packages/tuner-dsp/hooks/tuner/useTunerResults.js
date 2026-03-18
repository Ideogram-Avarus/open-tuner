import { useEffect, useRef, useState } from "react";
import { resultsDifferent } from "./utils";
export const useTunerResults = (getLatestResult, interval) => {
    const [result, setResult] = useState(null);
    const lastResultRef = useRef(null);
    useEffect(() => {
        const id = setInterval(() => {
            const next = getLatestResult();
            if (!next)
                return;
            const last = lastResultRef.current;
            if (!last) {
                lastResultRef.current = next;
                setResult(next);
                return;
            }
            if (resultsDifferent(next, last)) {
                lastResultRef.current = next;
                setResult(next);
            }
        }, interval);
        return () => clearInterval(id);
    }, [getLatestResult, interval]);
    return { result };
};
