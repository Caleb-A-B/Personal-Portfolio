import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = () => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prevRotation => [
        prevRotation[0],
        prevRotation[1] + 0.02,
        prevRotation[2],
      ]);
    }, 50);

    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <group>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <pointLight intensity={4} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={7}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[-4, -3.25, -1.5]}
        rotation={rotation}
        receiveShadow 
        castShadow 
      />
    </group>
  );
};

const ComputersCanvas = () => {
  return (
    <Suspense fallback={<CanvasLoader />} >
      <Canvas
      frameLoop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25}}
      gl={{ preserveDrawingBuffer: true }}
      >

          <OrbitControls enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          />
          <Computers />


        {/* <PreLoad all /> */}
      </Canvas>
    </Suspense>  
  )
}

export default ComputersCanvas