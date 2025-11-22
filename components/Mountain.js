'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Mountain() {
    const mountainRef = useRef();
    const rocksRef = useRef();

    // Generate realistic terrain using noise
    const terrainGeometry = useMemo(() => {
        // Reduced segments from 128 to 80 for better performance
        const geometry = new THREE.PlaneGeometry(12, 12, 80, 80);
        const positions = geometry.attributes.position.array;

        // Create mountain peaks with noise
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];

            // Distance from center for radial falloff
            const distance = Math.sqrt(x * x + y * y);
            const falloff = Math.max(0, 1 - distance / 6);

            // Multiple octaves of noise for realistic terrain
            const noise1 = Math.sin(x * 0.5) * Math.cos(y * 0.5);
            const noise2 = Math.sin(x * 1.2 + 3) * Math.cos(y * 1.2 + 3) * 0.5;
            const noise3 = Math.sin(x * 2.5 + 7) * Math.cos(y * 2.5 + 7) * 0.25;

            const height = (noise1 + noise2 + noise3) * falloff * 4;
            positions[i + 2] = Math.max(0, height);
        }

        geometry.computeVertexNormals();
        return geometry;
    }, []);

    // Create rock formations
    const rocks = useMemo(() => {
        const rockPositions = [];
        // Reduced rock count
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 2 + Math.random() * 2;
            rockPositions.push({
                position: [
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    Math.random() * 1.5
                ],
                scale: 0.2 + Math.random() * 0.4,
                rotation: [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ]
            });
        }
        return rockPositions;
    }, []);

    useFrame((state) => {
        if (mountainRef.current) {
            // Very subtle rotation for realism
            mountainRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.02;
        }
    });

    return (
        <group ref={mountainRef}>
            {/* Main mountain terrain */}
            <mesh
                geometry={terrainGeometry}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
                receiveShadow
            >
                <meshStandardMaterial
                    color="#4a5568"
                    roughness={0.95}
                    metalness={0.05}
                    flatShading={false}
                >
                    {/* Add vertex colors for variation */}
                    <primitive
                        attach="map"
                        object={(() => {
                            const canvas = document.createElement('canvas');
                            canvas.width = 256; // Reduced texture size
                            canvas.height = 256;
                            const ctx = canvas.getContext('2d');

                            // Create gradient texture
                            const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                            gradient.addColorStop(0, '#e8e8e8'); // Snow
                            gradient.addColorStop(0.3, '#8b7d6b'); // Rock
                            gradient.addColorStop(0.6, '#5a6b4a'); // Grass
                            gradient.addColorStop(1, '#3d4a3d'); // Dark base

                            ctx.fillStyle = gradient;
                            ctx.fillRect(0, 0, 256, 256);

                            return new THREE.CanvasTexture(canvas);
                        })()}
                    />
                </meshStandardMaterial>
            </mesh>

            {/* Snow cap overlay */}
            <mesh
                geometry={terrainGeometry}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.5, 0]}
                scale={[0.6, 0.6, 1]}
            >
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.4}
                    metalness={0.1}
                    transparent
                    opacity={0.9}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Rock formations */}
            <group ref={rocksRef}>
                {rocks.map((rock, i) => (
                    <mesh
                        key={i}
                        position={rock.position}
                        scale={rock.scale}
                        rotation={rock.rotation}
                    >
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial
                            color="#3a3a3a"
                            roughness={0.9}
                            metalness={0.1}
                        />
                    </mesh>
                ))}
            </group>

            {/* Ground plane */}
            <mesh
                position={[0, -3.5, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <circleGeometry args={[8, 32]} />
                <meshStandardMaterial
                    color="#1a2332"
                    roughness={0.95}
                    metalness={0.05}
                />
            </mesh>

            {/* Ambient particles (mist/snow) */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={100} // Reduced particle count
                        array={new Float32Array(
                            Array.from({ length: 300 }, () => (Math.random() - 0.5) * 15)
                        )}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#ffffff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>
        </group>
    );
}
