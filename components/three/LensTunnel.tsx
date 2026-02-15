"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LensTunnelProps {
    opacityRef: React.MutableRefObject<number>;
}

/* ─── Glass ring parameters ─── */
const RING_COUNT = 18;
const TUNNEL_LENGTH = 20;
const INNER_RADIUS = 1.5;
const OUTER_RADIUS = 3.0;

/* ─── Aperture blade mesh ─── */
function ApertureBlades({ z, rotation }: { z: number; rotation: number }) {
    const bladeCount = 7;
    const bladeRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (bladeRef.current) {
            bladeRef.current.rotation.z += delta * 0.1;
        }
    });

    const blades = useMemo(() => {
        return Array.from({ length: bladeCount }, (_, i) => {
            const angle = (i / bladeCount) * Math.PI * 2;
            return { angle, key: i };
        });
    }, []);

    return (
        <group ref={bladeRef} position={[0, 0, z]} rotation={[0, 0, rotation]}>
            {blades.map(({ angle, key }) => (
                <mesh key={key} position={[Math.cos(angle) * 1.0, Math.sin(angle) * 1.0, 0]} rotation={[0, 0, angle]}>
                    <planeGeometry args={[1.2, 0.4]} />
                    <meshPhysicalMaterial
                        color="#1a1a2e"
                        metalness={0.9}
                        roughness={0.2}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function LensTunnel({ opacityRef }: LensTunnelProps) {
    const groupRef = useRef<THREE.Group>(null);

    /* ─── Generate ring positions ─── */
    const rings = useMemo(() => {
        return Array.from({ length: RING_COUNT }, (_, i) => {
            const t = i / (RING_COUNT - 1);
            const z = -t * TUNNEL_LENGTH + 3; // Start in front of camera, extend back
            const radius = INNER_RADIUS + Math.sin(t * Math.PI * 2) * 0.5;
            const thickness = 0.08 + Math.random() * 0.06;
            // Alternate colors for chromatic effect
            const hue = 0.08 + t * 0.05; // gold → warm amber
            const color = new THREE.Color().setHSL(hue, 0.6, 0.4 + t * 0.2);
            return { z, radius, thickness, color, key: i };
        });
    }, []);

    /* ─── Outer shell rings ─── */
    const shellRings = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const t = i / 7;
            const z = -t * TUNNEL_LENGTH + 3;
            return { z, key: i };
        });
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            // Fade out the whole tunnel based on scroll progress
            groupRef.current.traverse((child) => {
                if ((child as THREE.Mesh).material) {
                    const mat = (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
                    if (mat.opacity !== undefined) {
                        mat.opacity = opacityRef.current;
                        mat.transparent = true;
                    }
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {/* Glass lens elements */}
            {rings.map(({ z, radius, thickness, color, key }) => (
                <mesh key={key} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius, thickness, 16, 64]} />
                    <meshPhysicalMaterial
                        color={color}
                        metalness={0.1}
                        roughness={0.05}
                        transmission={0.85}
                        thickness={0.5}
                        ior={1.8}
                        transparent
                        opacity={0.7}
                        envMapIntensity={2}
                    />
                </mesh>
            ))}

            {/* Outer metallic shell */}
            {shellRings.map(({ z, key }) => (
                <mesh key={`shell-${key}`} position={[0, 0, z]}>
                    <torusGeometry args={[OUTER_RADIUS, 0.15, 8, 48]} />
                    <meshStandardMaterial
                        color="#2a1a0a"
                        metalness={0.95}
                        roughness={0.3}
                        transparent
                    />
                </mesh>
            ))}

            {/* Aperture blades at key points */}
            <ApertureBlades z={2} rotation={0} />
            <ApertureBlades z={-2} rotation={0.3} />
            <ApertureBlades z={-6} rotation={0.6} />

            {/* Inner glow */}
            <pointLight position={[0, 0, -5]} intensity={3} color="#d4a050" distance={15} />
            <pointLight position={[0, 0, -10]} intensity={2} color="#8b0020" distance={10} />
        </group>
    );
}
