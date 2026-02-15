"use client";

import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MobileFallback from "./MobileFallback";

/* Dynamically import Canvas to avoid SSR issues */
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export default function ThreeScene() {
    const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (isMobile) {
        return <MobileFallback />;
    }

    return (
        <Suspense fallback={<MobileFallback />}>
            <SceneCanvas />
        </Suspense>
    );
}
