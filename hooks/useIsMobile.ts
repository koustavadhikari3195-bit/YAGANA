"use client";

import { useState, useEffect } from "react";

/**
 * Detects mobile viewport (<768px).
 * Uses `matchMedia` for efficiency + resize listener for SSR safety.
 */
export function useIsMobile(breakpoint = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const handler = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        // Initial check
        handler(mql);

        // Listen for changes
        mql.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
        return () => mql.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
    }, [breakpoint]);

    return isMobile;
}
