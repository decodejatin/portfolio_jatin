'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export default function GlassMonolith() {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const { viewport, mouse } = useThree();

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += delta * 0.05;
        meshRef.current.rotation.y += delta * 0.1;

        // Movement responsiveness: Mouse interaction with light
        if (lightRef.current) {
            lightRef.current.position.x = (mouse.x * viewport.width) / 2;
            lightRef.current.position.y = (mouse.y * viewport.height) / 2;
        }
    });

    return (
        <>
            {/* Subtle red light that follows mouse, adding "red color in movement" */}
            <pointLight ref={lightRef} color="#E11D48" intensity={5} distance={10} />

            <Float floatIntensity={0.5} rotationIntensity={0.3} speed={1}>
                <mesh ref={meshRef} scale={viewport.width > 10 ? 1.2 : 0.8} position={[0, 0, -2]}>
                    <torusKnotGeometry args={[1, 0.3, 256, 32]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        resolution={256}
                        transmission={1}
                        roughness={0.05}
                        thickness={2}
                        ior={1.1}
                        chromaticAberration={0.02}
                        anisotropy={0.1}
                        distortion={0}
                        distortionScale={0}
                        temporalDistortion={0}
                        clearcoat={1}
                        attenuationDistance={1}
                        attenuationColor="#ffffff"
                        color="#ffffff"
                        transparent
                        opacity={0.3} // Increased transparency for readability
                    />
                </mesh>
            </Float>
        </>
    );
}
