import { Html, Sphere, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/Loader";


const socket = new WebSocket('ws://localhost:8080')

export default function LevelScreen() {

  const [text, setText] = useState("");

  useEffect(() => {

    socket.onopen = function () {
      console.log('#open: send something');
      // socket.send(
      //   JSON.stringify({
      //     event: 'text',
      //     data: "text",
      //   })
      // );
    };

    socket.onmessage = (evt: MessageEvent) => {
      const data = JSON.parse(evt.data);
      console.log('received: %s', data);
      setText(data);
    };
  }, []);

  const onChangeText = (evt: any) => {
    console.log("val:", evt.target.value)
    socket.send(
      JSON.stringify({
        event: 'text',
        data: evt.target.value,
      })
    );
  };

  console.log("Welcome to the Level")
  // question in header
  // Wall/Canvas Scene for Socket Texts and Pen (Pixelarray or Vectors)
  return <>
    <Canvas>
      <Suspense fallback={<Loader />}>
        <color attach="background" args={["#171720"]} />

        <Stage
          // contactShadow={false} // Optional: creates a contactshadow underneath the content (default=true)
          shadows={true}  // Optional: lights cast shadow (default=true)
          adjustCamera={true}  // Optional: zooms the content in (default=true)
          intensity={1} // Optional: light intensity (default=1)
          environment="city" // Optional: environment (default=city)
          preset="rembrandt" // Optional: rembrandt (default) | portrait | upfront | soft
        // controls={controlsRef} // Optional: recalculates control target for correctness
        >
          <Html>
            <textarea rows={12} value={text} onChange={onChangeText} />
          </Html>
          <Sphere args={[1, 24, 24]}>
            <meshPhongMaterial color="royalblue" attach="material" />
          </Sphere>
          {/* <mesh /> */}

        </Stage>
      </Suspense>
    </Canvas>
  </>
}
