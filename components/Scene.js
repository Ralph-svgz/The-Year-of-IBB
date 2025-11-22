'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

// Dynamically import Mountain to prevent SSR issues
const Mountain = dynamic(() => import('./Mountain'), { ssr: false });

function CameraRig() {
    // Use a ref instead of state to avoid re-renders on every scroll event
    const scrollRef = useRef(0);
    const { viewport } = useThree();

    // Responsive radius based on viewport width
    // If viewport is narrow (mobile), move camera back (larger radius)
    const baseRadius = viewport.width < 5 ? 14 : 10;

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Store the raw scroll progress (0 to 1)
            scrollRef.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(({ camera }, delta) => {
        // Smoothly interpolate current camera position to target
        const targetProgress = scrollRef.current;

        // Calculate target position based on scroll
        const angle = targetProgress * Math.PI * 2;

        const targetX = Math.sin(angle) * baseRadius;
        const targetZ = Math.cos(angle) * baseRadius;
        const targetY = 3 + Math.sin(targetProgress * Math.PI * 2) * 2;

        // Smooth dampening for fluid camera movement
        // Using linear interpolation (lerp) for smoother follow
        camera.position.x += (targetX - camera.position.x) * delta * 2;
        camera.position.z += (targetZ - camera.position.z) * delta * 2;
        camera.position.y += (targetY - camera.position.y) * delta * 2;

        camera.lookAt(0, 0, 0);
    });

    return null;
}

export default function Scene() {
    // Use a ref to track mounted state to avoid double render effects
    const mounted = useRef(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        mounted.current = true;
        setIsMounted(true);
        return () => { mounted.current = false; };
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-1 pointer-events-none">
            <Canvas
                camera={{ position: [0, 3, 10], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 1.5]} // Cap DPR for performance
                shadows={false} // Disable shadows for better performance if needed, or keep low quality
                onCreated={({ gl }) => {
                    gl.setClearColor('#000000', 0);
                }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.3} color="#b8d4ff" />

                    <directionalLight
                        position={[10, 15, 5]}
                        intensity={1.5}
                        color="#fff5e6"
                    />

                    <directionalLight
                        position={[-5, 5, -5]}
                        intensity={0.4}
                        color="#7ba3cc"
                    />

                    <pointLight
                        position={[0, 8, -8]}
                        intensity={0.8}
                        color="#4a90e2"
                        distance={20}
                    />

                    <Stars
                        radius={100}
                        depth={50}
                        count={2000} // Reduced count slightly
                        factor={4}
                        saturation={0}
                        fade
                        speed={0.5}
                    />

                    <fog attach="fog" args={['#0a1929', 8, 25]} />

                    <Mountain />
                    <CameraRig />

                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}
