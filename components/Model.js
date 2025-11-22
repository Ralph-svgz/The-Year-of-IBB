'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Model() {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.15;
            meshRef.current.rotation.y = t * 0.25;
        }
    });

    return (
        <mesh ref={meshRef} scale={2.5}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="#4a90e2"
                roughness={0.3}
                metalness={0.7}
                wireframe={false}
            />
        </mesh>
    );
}
