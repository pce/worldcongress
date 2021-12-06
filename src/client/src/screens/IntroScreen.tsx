import * as THREE from "three"
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Html, useProgress, useTexture } from "@react-three/drei"
import { Mesh } from "three";

function Planet() {
  
  const ref = useRef<Mesh>(null!);

  const props = useTexture({
    map: 'assets/textures/moon-2313871_1920.jpg',
    displacementMap: 'assets/textures/moon-2313871_1920.jpg',
    normalMap: 'assets/textures/moon-2313871_1920.jpg',
    roughnessMap: 'assets/textures/moon-2313871_1920.jpg',
    aoMap: 'assets/textures/moon-2313871_1920.jpg',
  })

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.001
    ref.current.rotation.z += 0.0001
  })

  return <mesh ref={ref}>
    <sphereGeometry args={[0, 1, 1]} />
    {/* <sphereGeometry args={[3, 42, 42]} /> */}
    <sphereBufferGeometry args={[1, 100, 100]} />
    <meshLambertMaterial {...props}  
      color={0xffa500} 
      // ambient={0xaa0000}
    />
  </mesh>
}

function ZoomIn() {
  // const vec = new THREE.Vector3(0, 15, 30)
  const vec = new THREE.Vector3(0, 1, 1)
  return useFrame(({ camera }) => camera.position.lerp(vec, 0.001))
}


function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

export default function IntroScreen() {
   return <>
        <header className="app-header">
        <p>
          XERUS
        </p>
      </header> 
      <p className="app-intro--card">
        <a
          className="app-link"
          href="/room/123"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join
        </a>
        </p>
    <Canvas>
      <color attach="background" args={["#171720"]} />
      {/* <Html >
        <p className="app-card">
        <a
          className="app-link"
          href="/room/123"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join
        </a>
        </p> 
      </Html>  */}
      <ambientLight intensity={0.2} />
      <Suspense fallback={<Loader />}>
        <ZoomIn />  
        <directionalLight />
        <Planet />
        {/* <OrbitControls autoRotate /> */}
      </Suspense>
    </Canvas>
  </>
}