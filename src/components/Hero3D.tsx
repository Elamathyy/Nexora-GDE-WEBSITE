import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial, Box, PerspectiveCamera, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const location = useLocation();
  const [pulse, setPulse] = useState(1);

  // Trigger effect on route change or custom event
  useEffect(() => {
    const triggerEffect = () => {
      const tl = gsap.timeline();
      tl.to(meshRef.current!.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 0.1, ease: "power2.out" })
        .to(meshRef.current!.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      
      gsap.to(meshRef.current!.rotation, { y: "+=6.28", duration: 0.8, ease: "power4.inOut" });
      
      // Flash effect
      gsap.to(meshRef.current!.material, { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 });
    };

    triggerEffect();

    window.addEventListener('3d-burst', triggerEffect);
    return () => window.removeEventListener('3d-burst', triggerEffect);
  }, [location.pathname]);

  useFrame((state) => {
    const { x, y } = state.mouse;
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.1);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= 0.01;
      innerRef.current.rotation.y -= 0.01;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  useEffect(() => {
    gsap.to(groupRef.current!.position, {
      z: -5,
      y: 2,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });
  }, []);

  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        {/* Outer Wireframe Cube */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshBasicMaterial color="#00FF41" wireframe opacity={0.2} transparent />
        </mesh>
        
        {/* Inner Solid Core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial color="#00FF41" wireframe opacity={0.8} transparent />
        </mesh>

        {/* Dynamic Glow Sphere */}
        <Sphere args={[0.4, 32, 32]}>
          <meshBasicMaterial color="#00FF41" />
        </Sphere>
      </Float>

      <Points ref={pointsRef} positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#00FF41"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Data Stream Rings */}
      {[1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[3 + i * 0.8, 0.002, 16, 100]} />
          <meshBasicMaterial color="#00FF41" opacity={0.05 * (5 - i)} transparent />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00FF41" intensity={3} />
        <CyberCore />
      </Canvas>
    </div>
  );
}
