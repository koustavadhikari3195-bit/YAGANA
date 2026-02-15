"use client";

import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("@/components/preloader"), { ssr: false });
const LenisProvider = dynamic(() => import("@/components/lenis-provider"), { ssr: false });

export default function PreloaderWrapper({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <Preloader />
            <LenisProvider>{children}</LenisProvider>
        </>
    );
}
