"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import * as THREE from "three";
import LensRig from "./LensRig";

/**
 * Scene — Main R3F Canvas Wrapper.
 * Fixed behind the DOM content. ScrollControls syncs 3D camera to page scroll.
 */
export default function Scene() {
    return (
        <div
            className="fixed inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 55, near: 0.1, far: 50 }}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.5,
                }}
                dpr={[1, 1.5]}
            >
                <fog attach="fog" args={["#0a0005", 8, 25]} />
                <color attach="background" args={["#0a0005"]} />

                <ScrollControls pages={5} damping={0.2}>
                    <LensRig />
                </ScrollControls>
            </Canvas>
        </div>
    );
}
