import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  MeshWobbleMaterial,
  Html
} from '@react-three/drei';
import * as THREE from 'three';

const Eyes = ({ mousePosition }) => {
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();

  useFrame(() => {
    if (leftPupilRef.current && rightPupilRef.current && mousePosition) {
    
      const maxMovement = 0.3;
      const moveX = mousePosition.x * maxMovement;
      const moveY = mousePosition.y * maxMovement;
      
      leftPupilRef.current.position.x = -1.2 + moveX;
      leftPupilRef.current.position.y = 4.2 + moveY;
      
      rightPupilRef.current.position.x = 1.2 + moveX;
      rightPupilRef.current.position.y = 4.2 + moveY;
    }
  });

  return (
    <>
     
      <mesh position={[-1.2, 4.2, 2.3]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh ref={leftPupilRef} position={[-1.2, 4.2, 2.8]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <mesh position={[1.2, 4.2, 2.3]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh ref={rightPupilRef} position={[1.2, 4.2, 2.8]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </>
  );
};

const RobotBody = ({ mousePosition }) => {
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (leftPupilRef.current && rightPupilRef.current && mousePosition) {
    
      const maxMovement = 0.25;
      const moveX = mousePosition.x * maxMovement;
      const moveY = mousePosition.y * maxMovement;
      
      leftPupilRef.current.position.x = -1.2 + moveX;
      leftPupilRef.current.position.y = 4.2 + moveY;
      
      rightPupilRef.current.position.x = 1.2 + moveX;
      rightPupilRef.current.position.y = 4.2 + moveY;
    }
  
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
   
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[6, 7, 4]} />
        <meshPhysicalMaterial 
          color="#6366f1" 
          roughness={0.2} 
          metalness={0.1} 
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

  
      <mesh position={[0, 4, 2.1]} castShadow>
        <boxGeometry args={[5, 4, 0.2]} />
        <meshPhysicalMaterial 
          color="#4338ca" 
          roughness={0.1} 
          metalness={0.5}
        />
      </mesh>

      <mesh position={[-1.2, 4.2, 2.3]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh ref={leftPupilRef} position={[-1.2, 4.2, 2.8]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <mesh position={[1.2, 4.2, 2.3]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh ref={rightPupilRef} position={[1.2, 4.2, 2.8]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
 
      <mesh position={[0, 3.5, 2.3]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#e0e7ff" />
      </mesh>
      <group position={[-3.5, 5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
          <meshPhysicalMaterial color="#4f46e5" />
        </mesh>
  
        <mesh position={[-0.8, -2, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshWobbleMaterial 
            color="#fb923c" 
            speed={2} 
            factor={0.6} 
            emissive="#ea580c" 
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      <group position={[3.5, 5, 0]}>
        <mesh rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
          <meshPhysicalMaterial color="#4f46e5" />
        </mesh>
   
        <mesh position={[0.8, -2, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshWobbleMaterial 
            color="#fb923c" 
            speed={2} 
            factor={0.6} 
            emissive="#ea580c" 
            emissiveIntensity={2}
          />
        </mesh>
      </group>


      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[5, 6, 1.5, 64]} />
        <meshPhysicalMaterial color="#1e1e2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[6, 7, 0.8, 64]} />
        <meshPhysicalMaterial color="#11111b" metalness={0.9} roughness={0.1} />
      </mesh>
      
    
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshPhysicalMaterial color="#4f46e5" />
      </mesh>
      <mesh position={[1.5, 7, 1.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

const InsightRobot = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="w-full h-[600px] flex items-center justify-center bg-transparent"
      onMouseMove={handleMouseMove}
    >
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 8, 25]} fov={40} />
        
        <ambientLight intensity={0.7} />
        <pointLight position={[20, 20, 20]} intensity={2} color="#ffffff" />
        <spotLight position={[-20, 30, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        <directionalLight position={[0, 10, 5]} intensity={0.5} />
        
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={[0, -2, 0]}>
            <RobotBody mousePosition={mousePosition} />
          </group>
        </Float>

        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.6} 
          scale={30} 
          blur={2} 
          far={10} 
        />
   
        <OrbitControls enableZoom={false} enabled={false} />
      </Canvas>
    </div>
  );
};

export default InsightRobot;
