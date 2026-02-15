"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraMorphProps {
    morphRef: React.MutableRefObject<number>;
}

/* ─── Wireframe glow shader ─── */
const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vPosition = position;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uMorph;
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    // Solid phase: dark metallic surface
    vec3 solidColor = vec3(0.15, 0.08, 0.05);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);

    // Wireframe phase: glowing blue-gold edges
    float edge = sin(vPosition.x * 30.0 + uTime) * sin(vPosition.y * 30.0 + uTime) * sin(vPosition.z * 30.0);
    float wireStrength = smoothstep(0.3, 0.5, abs(edge));
    vec3 wireColor = mix(vec3(0.9, 0.7, 0.2), vec3(0.2, 0.5, 1.0), fresnel) * (1.0 + sin(uTime * 2.0) * 0.3);

    // Blend solid → wireframe based on morph
    vec3 color = mix(solidColor + fresnel * vec3(0.3, 0.15, 0.05), wireColor * wireStrength + fresnel * vec3(0.1, 0.3, 0.8), uMorph);

    // In wireframe mode, fragments far from edges become transparent
    float alpha = mix(1.0, wireStrength * 0.9 + fresnel * 0.5, uMorph);
    alpha = max(alpha, 0.05); // keep minimum visibility

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function CameraMorph({ morphRef }: CameraMorphProps) {
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            uMorph: { value: 0 },
            uTime: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uMorph.value = morphRef.current;
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
        if (groupRef.current) {
            // Gentle float
            groupRef.current.rotation.y += 0.003;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const shaderMat = (
        <shaderMaterial
            ref={materialRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
        />
    );

    return (
        <group ref={groupRef} position={[0, 0, -18]}>
            {/* Camera body */}
            <mesh>
                <boxGeometry args={[2.5, 1.8, 1.5, 8, 8, 8]} />
                {shaderMat}
            </mesh>

            {/* Viewfinder hump */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[1.2, 0.6, 0.8, 4, 4, 4]} />
                {shaderMat}
            </mesh>

            {/* Lens barrel */}
            <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.7, 0.9, 1.5, 16, 4]} />
                {shaderMat}
            </mesh>

            {/* Lens front element */}
            <mesh position={[0, 0, 2.0]}>
                <torusGeometry args={[0.65, 0.08, 8, 32]} />
                {shaderMat}
            </mesh>

            {/* Grip */}
            <mesh position={[1.5, -0.2, 0]}>
                <boxGeometry args={[0.5, 1.4, 1.2, 4, 4, 4]} />
                {shaderMat}
            </mesh>

            {/* Flash hotshoe */}
            <mesh position={[0, 1.55, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.4, 2, 2, 2]} />
                {shaderMat}
            </mesh>

            {/* Point light that intensifies during morph */}
            <pointLight
                position={[0, 0, 2.5]}
                intensity={morphRef.current * 3}
                color="#4488ff"
                distance={8}
            />
        </group>
    );
}
