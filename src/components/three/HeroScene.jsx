import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Icosahedron, RoundedBox } from "@react-three/drei";

const ACCENT = "#5b5bf0";
const ACCENT_SOFT = "#8583ff";

function Panel({ position, rotation, size = [1.1, 0.7, 0.03], speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox args={size} radius={0.05} position={position} rotation={rotation}>
        <meshStandardMaterial
          color="#f4f3ee"
          transparent
          opacity={0.05}
          roughness={0.6}
        />
        <Edges color={ACCENT_SOFT} lineWidth={0.6} threshold={1}>
          <meshBasicMaterial transparent opacity={0.35} color={ACCENT_SOFT} />
        </Edges>
      </RoundedBox>
    </Float>
  );
}

function Core() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.06;
    meshRef.current.rotation.y += delta * 0.09;
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <Icosahedron ref={meshRef} args={[0.55, 1]} position={[0, 0.35, 0]}>
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.22}
          wireframe
          transparent
          opacity={0.6}
        />
      </Icosahedron>
    </Float>
  );
}

function Rig({ scrollProgress, enablePointer }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetX = enablePointer ? state.pointer.y * 0.2 : 0;
    const targetY = enablePointer ? state.pointer.x * 0.3 : 0;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * Math.min(1, delta * 3);
    groupRef.current.rotation.y +=
      (targetY + scrollProgress * 1.4 - groupRef.current.rotation.y) *
      Math.min(1, delta * 3);

    groupRef.current.position.z = -2.4 - scrollProgress * 2.5;
    groupRef.current.position.y = -scrollProgress * 0.6;
  });

  return (
    <group ref={groupRef}>
      <Core />
      <Panel position={[-2.6, 0.9, -0.8]} rotation={[0.1, 0.4, 0.1]} speed={1.3} />
      <Panel position={[2.7, -0.7, -1.1]} rotation={[-0.15, -0.3, 0.05]} speed={1} />
      <Panel
        position={[1.9, 1.6, -1.6]}
        rotation={[0.2, 0.2, -0.1]}
        size={[0.75, 0.48, 0.03]}
        speed={1.6}
      />
    </group>
  );
}

function HeroScene({ scrollProgress = 0, enablePointer = true }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.5], fov: 38 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={30} color={ACCENT_SOFT} />
      <pointLight position={[-4, -2, -3]} intensity={10} color="#f4f3ee" />

      <Suspense fallback={null}>
        <Rig scrollProgress={scrollProgress} enablePointer={enablePointer} />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
