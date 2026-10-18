 "use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Suspense, useState } from "react";
import * as THREE from "three";

function RingModel({ tone }: { tone: string }) {
  const metal = tone === "Rose gold" ? "#b87966" : tone === "Silver" ? "#d8d8d8" : "#d4af77";
  return (
    <group rotation={[0.18, 0.2, -0.25]}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.05, 0.16, 28, 120]} />
        <meshStandardMaterial color={metal} metalness={0.96} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.06, 0]} castShadow>
        <octahedronGeometry args={[0.38, 2]} />
        <meshPhysicalMaterial color="#f9f5eb" roughness={0.035} metalness={0.02} transmission={0.25} thickness={0.6} clearcoat={1} clearcoatRoughness={0.03} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <mesh key={n} position={[Math.cos(n * Math.PI / 3) * 0.25, 0.87, Math.sin(n * Math.PI / 3) * 0.25]} scale={0.09}>
          <sphereGeometry args={[1, 18, 18]} />
          <meshStandardMaterial color={metal} metalness={0.98} roughness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D({ tone = "Yellow gold" }: { tone?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="scene-fallback" role="img" aria-label="3D preview unavailable">3D preview unavailable on this device</div>;
  return (
    <div className="scene-wrap">
      <Canvas
        shadows
        dpr={[1, 1.7]}
        camera={{ position: [0, 0.3, 4.8], fov: 42 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#11100e"), 1);
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        fallback={<div className="scene-fallback">Your browser does not support 3D preview.</div>}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <spotLight position={[4, 6, 4]} intensity={90} angle={0.45} penumbra={1} castShadow />
          <pointLight position={[-4, 1, -2]} intensity={18} color="#d4af77" />
          <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.25}>
            <RingModel tone={tone} />
          </Float>
          <Environment preset="studio" />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.48} scale={5} blur={2.8} far={4} />
          <Sparkles count={20} scale={4} size={1.2} speed={0.25} opacity={0.22} color="#f3d7a0" />
          <OrbitControls enablePan={false} minDistance={3.2} maxDistance={7} minPolarAngle={0.55} maxPolarAngle={2.45} />
        </Suspense>
      </Canvas>
      <span className="scene-hint">DRAG TO EXPLORE · 3D DEMO MODEL</span>
    </div>
  );
}
