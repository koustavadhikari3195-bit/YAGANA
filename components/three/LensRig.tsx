"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

/**
 * LensRig — 5 TorusGeometry lens elements arranged on Z-axis.
 * MeshPhysicalMaterial with full transmission (glass).
 * Camera z = scrollOffset * 20 → fly through the rings.
 */

const RING_POSITIONS = [-2, -1, 0, 1, 2]; // Z positions of lens elements
const RING_RADIUS = 2.5;
const TUBE_RADIUS = 0.12;

/* ─── Scroll-driven camera ─── */
function ScrollCamera() {
    const scroll = useScroll();
    const { camera } = useThree();

    useFrame(() => {
        const z = scroll.offset * 20;
        camera.position.z = 5 - z; // Start at z=5, fly to z=-15
        camera.lookAt(0, 0, camera.position.z - 5);
    });

    return null;
}

/* ─── Lens ring with glass material ─── */
function LensElement({ z, index }: { z: number; index: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Slight rotation animation for life
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
            meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2 + index * 0.5) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, z]}>
            <torusGeometry args={[RING_RADIUS, TUBE_RADIUS, 32, 128]} />
            <meshPhysicalMaterial
                transmission={1}
                roughness={0}
                color="white"
                thickness={0.5}
                ior={1.5}
                envMapIntensity={3}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}

/* ─── Outer barrel rings (metallic) ─── */
function BarrelRing({ z }: { z: number }) {
    return (
        <mesh position={[0, 0, z]}>
            <torusGeometry args={[RING_RADIUS + 0.8, 0.08, 16, 64]} />
            <meshStandardMaterial
                color="#2a1a0a"
                metalness={0.95}
                roughness={0.2}
            />
        </mesh>
    );
}

/* ─── Aperture blades at the center ring ─── */
function ApertureBlades() {
    const groupRef = useRef<THREE.Group>(null);
    const bladeCount = 7;

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    const blades = useMemo(() =>
        Array.from({ length: bladeCount }, (_, i) => {
            const angle = (i / bladeCount) * Math.PI * 2;
            return { angle, key: i };
        }), []
    );

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {blades.map(({ angle, key }) => (
                <mesh
                    key={key}
                    position={[Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0]}
                    rotation={[0, 0, angle]}
                >
                    <planeGeometry args={[1.4, 0.5]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        metalness={0.9}
                        roughness={0.15}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ─── Main Export ─── */
export default function LensRig() {
    return (
        <>
            <ScrollCamera />

            {/* 5 Glass Lens Elements */}
            {RING_POSITIONS.map((z, i) => (
                <LensElement key={i} z={z} index={i} />
            ))}

            {/* Metallic barrel rings */}
            <BarrelRing z={-3} />
            <BarrelRing z={3} />
            <BarrelRing z={-1.5} />
            <BarrelRing z={1.5} />

            {/* Aperture blades at center */}
            <ApertureBlades />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 3, 5]} intensity={1.5} color="#fbbf24" />
            <directionalLight position={[-3, 2, -3]} intensity={0.6} color="#dc2626" />
            <pointLight position={[0, 0, -3]} intensity={3} color="#f59e0b" distance={15} />
            <pointLight position={[0, 0, 3]} intensity={2} color="#3b82f6" distance={10} />
        </>
    );
}
