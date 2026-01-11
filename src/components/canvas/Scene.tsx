'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { Suspense } from 'react'
import NeuralNetwork from './NeuralNetwork'
import Particles from './Particles'

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ antialias: false, alpha: true, stencil: false, depth: true }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <Particles />
                    <NeuralNetwork />
                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={0.5} />
                    </EffectComposer>
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    )
}
