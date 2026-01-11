'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SHARP GEOMETRIC BACKGROUND
 * Focuses on high-precision lines, wireframes, and mathematical symmetry.
 * Replaces the soft "glass" with razor-sharp vectors.
 */
export default function SharpBackground() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate a high-precision complex wireframe
    const { nodes, connections } = useMemo(() => {
        const nodes: THREE.Vector3[] = [];
        const connections: [THREE.Vector3, THREE.Vector3][] = [];
        const count = 40;
        const radius = 8;

        for (let i = 0; i < count; i++) {
            nodes.push(new THREE.Vector3(
                (Math.random() - 0.5) * radius * 2,
                (Math.random() - 0.5) * radius * 2,
                (Math.random() - 0.5) * radius * 2
            ));
        }

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                if (nodes[i].distanceTo(nodes[j]) < 4) {
                    connections.push([nodes[i], nodes[j]]);
                }
            }
        }
        return { nodes, connections };
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = time * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {/* 
          1. THE VECTOR CONNECTIONS
          Deeply transparent white lines forming a subtle neural web.
      */}
            {connections.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color="#ffffff"
                    lineWidth={0.2}
                    transparent
                    opacity={0.03}
                />
            ))}

            {/* 
          2. THE CORE ARTIFACT
          A rotating glass-like monolith core.
      */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh>
                    <octahedronGeometry args={[2, 0]} />
                    <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
                </mesh>
                <mesh scale={[1.02, 1.02, 1.02]}>
                    <octahedronGeometry args={[2, 0]} />
                    <meshBasicMaterial color="#E11D48" transparent opacity={0.02} side={THREE.DoubleSide} />
                </mesh>
            </Float>

            {/* 
          3. FLOATING DATA NODES
          Tiny points of light.
      */}
            {nodes.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.015, 8, 8]} />
                    <meshBasicMaterial color={i % 5 === 0 ? "#E11D48" : "#ffffff"} transparent opacity={0.2} />
                </mesh>
            ))}
        </group>
    );
}
