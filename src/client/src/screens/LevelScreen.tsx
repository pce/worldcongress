import { Stage } from "@react-three/drei";

export default function LevelScreen() {
  // question in header
  // Wall/Canvas Scene for Socket Texts and Pen (Pixelarray or Vectors)
  return <>  
      <Stage
        // contactShadow={false} // Optional: creates a contactshadow underneath the content (default=true)
        shadows={true}  // Optional: lights cast shadow (default=true)
        adjustCamera={true}  // Optional: zooms the content in (default=true)
        intensity={1} // Optional: light intensity (default=1)
        environment="city" // Optional: environment (default=city)
        preset="rembrandt" // Optional: rembrandt (default) | portrait | upfront | soft
        // controls={controlsRef} // Optional: recalculates control target for correctness
    >
      <mesh />
    </Stage>
  </> 
}
