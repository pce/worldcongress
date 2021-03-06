import { Html, Sphere, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { io, Socket } from "socket.io-client";
import TextArea from "../components/TextArea";
import Reactions from "../components/Reactions";


export default function LevelScreen() {

  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(`https://${window.location.hostname}`);
    let API_URL = `https://${window.location.hostname}`;
    if (window.location.hostname === 'localhost') {
      socketRef.current = io(`http://${window.location.hostname}:8080`);
      API_URL = `http://${window.location.hostname}:8080`;
    }
    // get the saved document of room
    let title = window.location.pathname.replace("/room/", "");
    fetch(`${API_URL}/docs/${title}`).then((res) => res.json()).then((json) => {
      console.log(json)
    })

    // cleanup
    return () => { socketRef.current?.disconnect(); }
  }, []);

  console && console.log("Welcome to the Doc")
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
          // environment="city" // Optional: environment (default=city)
          preset="rembrandt" // Optional: rembrandt (default) | portrait | upfront | soft
          // controls={controlsRef} // Optional: recalculates control target for correctness
        >

          <Html className="content" transform={false} center={true}  >
            {socketRef ? (
                <>
                <TextArea socketRef={socketRef} />
                <Reactions socketRef={socketRef}  />
                </>
              ) : (
                <div>Not Connected</div>
              )}
          </Html>
          <Sphere args={[1, 24, 24]}>
            <meshPhongMaterial color="royalblue" attach="material" />
          </Sphere>

        </Stage>
      </Suspense>
    </Canvas>
  </>
}
