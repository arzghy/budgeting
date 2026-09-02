"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

const PALETTE = {
  sage: "#c2d772",
  blush: "#f6dbe2",
  cream: "#f6ffd3",
  coral: "#f6c5c1",
};

/* ── 3D Calculator Model (.glb) ── */
function ModelMesh({
  mouse,
  hover,
  scrollProgress = 0,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  hover: boolean;
  scrollProgress?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the 3D model from public/models/calculator.glb
  const { scene } = useGLTF("/models/calculator.glb");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = hover ? 2.0 : 1.2;

    if (groupRef.current) {
      // Base rotation from scroll (0 rad at Section 1 -> 360 deg / Math.PI * 2 at Section 2)
      const baseScrollRotY = scrollProgress * Math.PI * 2;

      // Smooth mouse parallax + subtle idle wave
      const targetRotY = baseScrollRotY + mouse.current.x * 0.35 + Math.sin(t * 0.4) * 0.06;
      const targetRotX = -mouse.current.y * 0.25 + Math.sin(t * speed * 0.5) * 0.04;
      const targetRotZ = -mouse.current.x * 0.05;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.08);

      // Gentle floating heave centered
      groupRef.current.position.y = Math.sin(t * speed * 0.6) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={1.38} />
      </Center>
    </group>
  );
}

// Preload the GLB model
useGLTF.preload("/models/calculator.glb");

export default function WhaleScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [hover, setHover] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  // Use smooth window-level mouse tracking to prevent jump/jitter during scroll animations
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      className="h-full w-full cursor-grab active:cursor-grabbing"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5.7], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.35} />
        <directionalLight position={[6, 7, 5]} intensity={1.45} color="#fffbe8" />
        <directionalLight position={[-5, 3, 2]} intensity={0.85} color={PALETTE.coral} />
        <pointLight position={[0, 2.5, 3]} intensity={0.9} color={PALETTE.cream} />
        <hemisphereLight color={PALETTE.cream} groundColor={PALETTE.blush} intensity={0.65} />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.3}>
            <ModelMesh mouse={mouse} hover={hover} scrollProgress={scrollProgress} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
