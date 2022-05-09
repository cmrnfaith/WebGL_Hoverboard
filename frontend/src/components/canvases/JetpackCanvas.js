import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";

import Jetpack from "../Jetpack";
import Loading from "../Loading";
import Interface from "../Interface";

const defaultCamera = [0, 10, 18];
const defaultBackground = "dawn";

const JetpackCanvas = (props) => {
  const [backgroundTexture, setBackGroundTexture] = useState(defaultBackground);
  const [customBackgroundEnable, setCustomBackgroundEnable] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(defaultCamera);
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {}, []);
  const orbitControlsRef = useRef(null);

  function updateCamera() {
    orbitControlsRef.current.update();
    console.log(orbitControlsRef.current.object.position);
    // Needs to update perspective Camera .updateProjectionMatrix ()
  }
  function updateAutoRotate() {
    console.log(orbitControlsRef.current);
    orbitControlsRef.current.autoRotate = !autoRotate;
    setAutoRotate(!autoRotate);
    orbitControlsRef.current.update();
    // Needs to update perspective Camera .updateProjectionMatrix ()
  }
  console.log(props);
  return (
    <div className="canvas">
      <Interface
        backgroundTexture={backgroundTexture}
        setBackGround={setBackGroundTexture}
        cameraPosition={cameraPosition}
        updateCamera={updateCamera}
        setCustomBackgroundEnable={setCustomBackgroundEnable}
        setCameraPosition={setCameraPosition}
        updateAutoRotate={updateAutoRotate}
      />
      <Canvas id="Jetpack_canvas" shadows>
        <OrbitControls ref={orbitControlsRef} autoRotate={autoRotate}>
          <mesh position={[0, 4, 0]}></mesh>
        </OrbitControls>
        <ambientLight intensity={1} />
        <directionalLight intensity={5} />
        <Suspense fallback={Loading}>
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={50}
          ></PerspectiveCamera>
          <Environment
            preset={backgroundTexture}
            background={customBackgroundEnable}
            ground={{
              height: 7, // Height of the camera that was used to create the env map (Default: 15)
              radius: 40, // Radius of the world. (Default 60)
              scale: 1000, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
            }}
          ></Environment>
          {/* Floor */}
          {/* <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
            <planeGeometry args={[20000, 20000]} />
            <meshStandardMaterial color="#1ea3d8" />
          </mesh> */}
          <Float
            position={[0, 4, 0]}
            rotation={[0, 0.01, 0]}
            rotationIntensity={0.45}
            floatIntensity={6}
            speed={4}
          >
            <Jetpack
              name={
                props.match.params.item ? props.match.params.item : props.item
              }
            />
            {/* <Item name={props.match.params.key} /> */}
          </Float>

          <ContactShadows
            opacity={1}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
          {/* <Backdrop
          castShadow
          floor={5}
          position={[0, -3, -3]}
          scale={[50, 30, 40]}
        >
          <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
        </Backdrop> */}
        </Suspense>

        <OrbitControls
          minPolarAngle={angleToRadians(20)}
          maxPolarAngle={angleToRadians(70)}
          target={[0, 4, 0]}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default JetpackCanvas;
