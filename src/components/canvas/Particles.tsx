'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore - maath types can be tricky
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

export default function Particles(props: any) {
    const ref = useRef<THREE.Points>(null);

    // Use a Float32Array directly
    const [sphere] = useState(() => {
        const data = new Float32Array(5000 * 3);
        // @ts-ignore
        random.inSphere(data, { radius: 10 });
        return data;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#888888"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}
