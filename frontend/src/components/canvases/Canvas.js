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

import Loading from "../Loading";
import Interface from "../Interface";
import Item from "../Item";

const defaultCamera = [0, 0.6, 3.8];
const defaultBackground = "dawn";

const ItemCanvas = (props) => {
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
      <Canvas id="canvas" shadows>
        <OrbitControls ref={orbitControlsRef} autoRotate={autoRotate}>
          <mesh position={[0, 0.5, 0]}></mesh>
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
              height: 2, // Height of the camera that was used to create the env map (Default: 15)
              radius: 10, // Radius of the world. (Default 60)
              scale: 1200, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
            }}
          ></Environment>
          <Float
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            rotationIntensity={0}
            floatIntensity={0}
            speed={4}
          >
            <Item
              name={
                props.match.params.item ? props.match.params.item : props.item
              }
              collection={
                props.match.params.collection
                  ? props.match.params.collection
                  : props.collection
              }
            />
          </Float>

          <ContactShadows
            opacity={1}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          minPolarAngle={angleToRadians(20)}
          maxPolarAngle={angleToRadians(70)}
          target={[0, 0.8, 0]}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default ItemCanvas;
