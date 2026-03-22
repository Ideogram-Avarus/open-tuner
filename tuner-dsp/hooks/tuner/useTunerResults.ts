import { useEffect, useRef, useState } from "react";
import type { TunerResult } from "../../specs";
import { resultsDifferent } from "./utils";

export const useTunerResults = (
    getLatestResult: () => TunerResult | null,
    interval: number
) => {
    const [result, setResult] = useState<TunerResult | null>(null);
    const lastResultRef = useRef<TunerResult | null>(null);

    useEffect(() => {
        const id = setInterval(() => {
            const next = getLatestResult();

            if (!next) return;

            const last = lastResultRef.current;

            if (!last) {
                lastResultRef.current = next;
                setResult(next);
                return;
            }

            if (!next.hasPitch) {
                const updated = { ...last, hasPitch: false };
                lastResultRef.current = updated;
                if(resultsDifferent(updated, last)) {
                    setResult(updated);
                }
                return;

            }


            if(resultsDifferent(next, last)) {
                lastResultRef.current = next;
                setResult(next);
            }
            
        }, interval);

        return () => clearInterval(id);
    }, [getLatestResult, interval]);

    return { result };
};