import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Icosahedron, RoundedBox } from "@react-three/drei";

const LIME = "#9cb84b";
const GOLD = "#e4b94a";
const GOLD_SOFT = "#f0cf7a";

function Panel({ position, rotation, size = [1.1, 0.7, 0.03], speed = 1, reducedMotion }) {
  const content = (
    <RoundedBox args={size} radius={0.05} position={position} rotation={rotation}>
      <meshStandardMaterial color="#f4f3ee" transparent opacity={0.05} roughness={0.6} />
      <Edges color={GOLD_SOFT} lineWidth={0.6} threshold={1}>
        <meshBasicMaterial transparent opacity={0.35} color={GOLD_SOFT} />
      </Edges>
    </RoundedBox>
  );

  if (reducedMotion) return content;

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      {content}
    </Float>
  );
}

function Core({ reducedMotion, speedMultiplier }) {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.x += delta * 0.06 * speedMultiplier;
    meshRef.current.rotation.y += delta * 0.09 * speedMultiplier;
  });

  const mesh = (
    <Icosahedron ref={meshRef} args={[0.55, 1]} position={[0, 0.35, 0]}>
      <meshStandardMaterial
        color={LIME}
        emissive={GOLD}
        emissiveIntensity={0.22}
        wireframe
        transparent
        opacity={0.6}
      />
    </Icosahedron>
  );

  if (reducedMotion) return mesh;

  return (
    <Float speed={1 * speedMultiplier} rotationIntensity={0.15} floatIntensity={0.4}>
      {mesh}
    </Float>
  );
}

function Rig({ enablePointer, reducedMotion, speedMultiplier, minimal }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    const targetX = enablePointer ? state.pointer.y * 0.2 : 0;
    const targetY = enablePointer ? state.pointer.x * 0.3 : 0;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * Math.min(1, delta * 3);
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * Math.min(1, delta * 3 * speedMultiplier);
  });

  return (
    <group ref={groupRef}>
      <Core reducedMotion={reducedMotion} speedMultiplier={speedMultiplier} />
      {!minimal && (
        <>
          <Panel
            position={[-2.6, 0.9, -0.8]}
            rotation={[0.1, 0.4, 0.1]}
            speed={1.3 * speedMultiplier}
            reducedMotion={reducedMotion}
          />
          <Panel
            position={[2.7, -0.7, -1.1]}
            rotation={[-0.15, -0.3, 0.05]}
            speed={1 * speedMultiplier}
            reducedMotion={reducedMotion}
          />
          <Panel
            position={[1.9, 1.6, -1.6]}
            rotation={[0.2, 0.2, -0.1]}
            size={[0.75, 0.48, 0.03]}
            speed={1.6 * speedMultiplier}
            reducedMotion={reducedMotion}
          />
        </>
      )}
    </group>
  );
}

function HeroScene({
  reducedMotion = false,
  enablePointer = true,
  speedMultiplier = 1,
  minimal = false,
  active = true,
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.5], fov: 38 }}
      frameloop={active ? "always" : "never"}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={30} color={GOLD_SOFT} />
      <pointLight position={[-4, -2, -3]} intensity={10} color="#f4f3ee" />

      <Suspense fallback={null}>
        <Rig
          enablePointer={enablePointer}
          reducedMotion={reducedMotion}
          speedMultiplier={speedMultiplier}
          minimal={minimal}
        />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
