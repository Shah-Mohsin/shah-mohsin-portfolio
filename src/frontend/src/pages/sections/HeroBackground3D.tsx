import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";

// Particle field — subtle wave motion, reduced opacity
function ParticleField() {
  const meshRef = useRef<Points>(null);
  const count = 900;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const t = Math.random();
      if (t < 0.5) {
        // Cyan
        col[i * 3] = 0.0;
        col[i * 3 + 1] = 0.83 + Math.random() * 0.08;
        col[i * 3 + 2] = 1.0;
      } else {
        // Purple
        col[i * 3] = 0.66 + Math.random() * 0.08;
        col[i * 3 + 1] = 0.33;
        col[i * 3 + 2] = 0.97;
      }
      sz[i] = Math.random() * 2.0 + 0.4;
    }
    return { positions: pos, colors: col, sizes: sz };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const origX = positions[ix];
      const origY = positions[ix + 1];
      const origZ = positions[ix + 2];
      posArray[ix] = origX + Math.sin(time * 0.25 + origY * 0.4) * 0.25;
      posArray[ix + 1] = origY + Math.cos(time * 0.18 + origX * 0.35) * 0.2;
      posArray[ix + 2] = origZ + Math.sin(time * 0.32 + origX * 0.28) * 0.18;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.025;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.slice(), 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Rotating wireframe shape
function FloatingShape({
  position,
  geometry,
  color,
  speed,
}: {
  position: [number, number, number];
  geometry: "torus" | "octahedron" | "icosahedron";
  color: string;
  speed: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * speed * 0.45;
    meshRef.current.rotation.y = t * speed * 0.65;
    meshRef.current.rotation.z = t * speed * 0.28;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.45 + position[0]) * 0.35;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "torus" && <torusGeometry args={[1.2, 0.32, 14, 36]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[1.0]} />}
      {geometry === "icosahedron" && <icosahedronGeometry args={[0.95]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.45}
        transparent
        opacity={0.28}
      />
    </mesh>
  );
}

// Name letters scatter → form cycle
function NameLetters() {
  const groupRef = useRef<Group>(null);
  const LETTERS = "SHAH MOHSIN";
  const letterMeshes = useRef<Mesh[]>([]);

  // Stable keys — never use array index directly in JSX key
  const LETTER_KEYS = [
    "S0",
    "H1",
    "A2",
    "H3",
    "_4",
    "M5",
    "O6",
    "H7",
    "S8",
    "I9",
    "N10",
  ] as const;

  const scatterPositions = useMemo(
    () =>
      LETTERS.split("").map(() => ({
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 14,
        z: (Math.random() - 0.5) * 10,
      })),
    [],
  );

  const formPositions = useMemo(() => {
    const spacing = 1.1;
    const totalWidth = (LETTERS.length - 1) * spacing;
    return LETTERS.split("").map((_, i) => ({
      x: i * spacing - totalWidth / 2,
      y: 0,
      z: 0,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const cycle = t % 8;
    const forming = cycle > 3 && cycle < 6;
    const holding = cycle >= 6;

    const progress = forming
      ? Math.min((cycle - 3) / 3, 1)
      : holding
        ? 1
        : Math.max(0, 1 - (cycle / 3) * 1.5);

    for (let i = 0; i < letterMeshes.current.length; i++) {
      const mesh = letterMeshes.current[i];
      if (!mesh) continue;
      const scatter = scatterPositions[i];
      const form = formPositions[i];
      mesh.position.x = scatter.x + (form.x - scatter.x) * progress;
      mesh.position.y = scatter.y + (form.y - scatter.y) * progress;
      mesh.position.z = scatter.z + (form.z - scatter.z) * progress;
      mesh.rotation.x = (1 - progress) * Math.sin(t * 0.7 + i) * 2;
      mesh.rotation.y = (1 - progress) * Math.cos(t * 0.55 + i) * 2;
    }
    groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0.5, -3]}>
      {LETTERS.split("").map((char, i) => (
        <mesh
          key={LETTER_KEYS[i]}
          ref={(el) => {
            if (el) letterMeshes.current[i] = el;
          }}
        >
          <boxGeometry
            args={char === " " ? [0.01, 0.01, 0.01] : [0.5, 0.7, 0.15]}
          />
          <meshStandardMaterial
            color={i < 4 ? "#00d4ff" : "#a855f7"}
            emissive={i < 4 ? "#00d4ff" : "#a855f7"}
            emissiveIntensity={0.9}
            transparent
            opacity={char === " " ? 0 : 0.7}
            roughness={0.15}
            metalness={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

// Moving energy grid floor
function GridFloor() {
  const gridGroupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!gridGroupRef.current) return;
    gridGroupRef.current.position.z = (state.clock.elapsedTime * 0.45) % 2;
  });

  const lines = useMemo(() => {
    const lineArr: { x?: number; z?: number; isX: boolean; key: string }[] = [];
    for (let i = -12; i <= 12; i += 2) {
      lineArr.push({ x: i, isX: true, key: `x-${i}` });
      lineArr.push({ z: i, isX: false, key: `z-${i}` });
    }
    return lineArr;
  }, []);

  return (
    <group ref={gridGroupRef} position={[0, -6, 0]}>
      {lines.map((line) => (
        <mesh
          key={line.key}
          position={line.isX ? [line.x ?? 0, 0, 0] : [0, 0, line.z ?? 0]}
          rotation={
            line.isX ? [Math.PI / 2, 0, 0] : [Math.PI / 2, 0, Math.PI / 2]
          }
        >
          <planeGeometry args={[0.015, 20]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.05}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, 8, -5]} intensity={0.6} color="#ffffff" />

      <ParticleField />
      <NameLetters />

      <FloatingShape
        position={[-9, 2, -4]}
        geometry="torus"
        color="#00d4ff"
        speed={0.38}
      />
      <FloatingShape
        position={[8, -2, -5]}
        geometry="octahedron"
        color="#a855f7"
        speed={0.55}
      />
      <FloatingShape
        position={[6, 4, -3]}
        geometry="icosahedron"
        color="#00d4ff"
        speed={0.3}
      />
      <FloatingShape
        position={[-7, -3, -3]}
        geometry="icosahedron"
        color="#a855f7"
        speed={0.45}
      />

      <GridFloor />
    </>
  );
}

export function HeroBackground3D() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
      aria-hidden="true"
    >
      <Suspense fallback={<div className="absolute inset-0 gradient-hero" />}>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 58 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
