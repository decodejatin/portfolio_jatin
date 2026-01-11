'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function ProgrammingMonolith() {
    const groupRef = useRef<THREE.Group>(null);

    const codeLines = [
        "std::cout << 'Jatin';",
        "fn solve() { ... }",
        "P = NP?",
        "while(true) {",
        "01011101",
        "cout << rating;",
        "git commit -m"
    ];

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
            groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Core Monolith - Cleaner Neutral Glass */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.5, 4, 0.4]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={1}
                        roughness={0.05}
                        transmission={1}
                        ior={1.1}
                        chromaticAberration={0.02}
                        anisotropy={0.1}
                        color="#ffffff"
                        transparent
                        opacity={0.15}
                    />
                </mesh>

                {/* Floating Code Snippets around the block - Subtle White/Gray */}
                {codeLines.map((line, i) => (
                    <Text
                        key={i}
                        position={[
                            Math.sin(i * 1.5) * 3.5,
                            Math.cos(i * 1.5) * 2.5,
                            Math.sin(i) * 1.2
                        ]}
                        fontSize={0.15}
                        color="#ffffff"
                        fillOpacity={0.2}
                        strokeWidth={0.01}
                        strokeColor="#ffffff"
                        strokeOpacity={0.1}
                    >
                        {line}
                    </Text>
                ))}
            </Float>

            {/* Background Subtle Gradient Glow (Neutral) */}
            <mesh position={[0, 0, -5]}>
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
            </mesh>
        </group>
    );
}
