import React, { useRef, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Segment = ({ color, rotation, arc = Math.PI / 2.2, position = [0, 0, 0], showStartCap = false, showEndCap = false }) => {
  const meshRef = useRef();

  const radius = 10;
  const tubeRadius = 3;
  const startAngle = 0;
  const endAngle = arc;

  return (
    <group rotation={rotation} position={position}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tubeRadius, 64, 100, arc]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.45}
          reflectivity={0.5}
          attenuationColor={color}
          attenuationDistance={2}
          transparent
          opacity={0.9}
        />
      </mesh>
 
      {showStartCap && (
        <mesh position={[radius * Math.cos(startAngle), radius * Math.sin(startAngle), 0]}>
          <sphereGeometry args={[tubeRadius, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.05}
            metalness={0.1}
            transmission={0.9}
            thickness={5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.45}
            reflectivity={0.5}
            attenuationColor={color}
            attenuationDistance={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
   
      {showEndCap && (
        <mesh position={[radius * Math.cos(endAngle), radius * Math.sin(endAngle), 0]}>
          <sphereGeometry args={[tubeRadius, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.05}
            metalness={0.1}
            transmission={0.9}
            thickness={5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.45}
            reflectivity={0.5}
            attenuationColor={color}
            attenuationDistance={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
    </group>
  );
};

const Logo = () => {
  const groupRef = useRef();
  const arcLength = Math.PI / 2.2;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, -Math.PI / 40]} scale={0.8}>
  
      <Segment 
        color="#A855F7"
        rotation={[0, 0, Math.PI / 6]}
        showStartCap={true}
      />
     
      <Segment 
        color="#2563EB" 
        rotation={[0, 0, Math.PI / 6 + arcLength]} 
      />
   
      <Segment 
        color="#06B6D4" 
        rotation={[0, 0, Math.PI /6  + arcLength * 2]}
        arc={Math.PI / 1.5}
        showEndCap={true}
      />
    </group>
  );
};

const Logo3D = memo(() => {
  return (
    <div className="w-full h-[600px] flex items-center justify-center bg-transparent">
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        performance={{ min: 0.5 }}
        gl={{ 
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
        onCreated={({ gl }) => {
          const canvas = gl.getContext().canvas;
          canvas.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost - Logo3D');
          }, false);
          canvas.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored - Logo3D');
          }, false);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 35]} fov={45} />
        
      
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <spotLight position={[-20, 20, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[0, -10, 5]} intensity={0.5} color="#ffffff" />
        
        <Environment preset="city" />
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <Logo />
        </Float>

        <ContactShadows 
          position={[0, -15, 0]} 
          opacity={0.4} 
          scale={50} 
          blur={2.5} 
          far={20} 
        />
        
        <OrbitControls enableZoom={false} makeDefault />
      </Canvas>
    </div>
  );
});

Logo3D.displayName = 'Logo3D';

export default Logo3D;
