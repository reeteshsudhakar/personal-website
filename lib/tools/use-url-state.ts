"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ToolState = Record<string, string>;

type UseToolUrlStateOptions<TState extends ToolState> = {
    defaults: TState;
    paramMap: Record<keyof TState, string>;
    maxQueryLength?: number;
    debounceMs?: number;
};

export function useToolUrlState<TState extends ToolState>({
    defaults,
    paramMap,
    maxQueryLength = 4000,
    debounceMs = 300,
}: UseToolUrlStateOptions<TState>) {
    const defaultsRef = useRef(defaults);
    const paramMapRef = useRef(paramMap);
    const [state, setState] = useState<TState>(defaultsRef.current);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isQueryTooLarge, setIsQueryTooLarge] = useState(false);

    const keys = useMemo(() => Object.keys(paramMapRef.current) as (keyof TState)[], []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams(window.location.search);
        const nextState = { ...defaultsRef.current };

        keys.forEach((key) => {
            const paramKey = paramMapRef.current[key];
            const value = params.get(paramKey);
            if (value !== null) {
                nextState[key] = value as TState[keyof TState];
            }
        });

        setState(nextState);
        setIsHydrated(true);
    }, [keys]);

    useEffect(() => {
        if (!isHydrated || typeof window === "undefined") return;

        const timer = window.setTimeout(() => {
            const url = new URL(window.location.href);

            keys.forEach((key) => {
                url.searchParams.delete(paramMapRef.current[key]);
            });

            keys.forEach((key) => {
                const value = state[key];
                if (value !== defaultsRef.current[key]) {
                    url.searchParams.set(paramMapRef.current[key], value);
                }
            });

            const nextPath = `${url.pathname}${url.search ? `?${url.searchParams.toString()}` : ""}`;

            if (nextPath.length > maxQueryLength) {
                setIsQueryTooLarge(true);
                return;
            }

            setIsQueryTooLarge(false);
            window.history.replaceState(null, "", nextPath);
        }, debounceMs);

        return () => window.clearTimeout(timer);
    }, [debounceMs, isHydrated, keys, maxQueryLength, state]);

    return { state, setState, isQueryTooLarge };
}
