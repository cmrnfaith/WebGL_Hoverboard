import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useState, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";

import Loading from "../Loading";
import AvaInterface from "../AvaInterface";
import animate from "../Animate";
import Item from "../Item";
import * as TWEEN from "@tweenjs/tween.js";

const defaultCamera = [0, 0.6, 3.8];
const defaultBackground = "dawn";
const defaultBackgrounds = [
  "sunset",
  "dawn",
  "warehouse",
  "forest",
  "apartment",
  "studio",
  "city",
  "park",
  "lobby",
];

const defaultCameras = [
  {
    value: [-0.35, 1.4, 2.2],
    name: "Default",
    target: [0, 0.8, 0],
    rotation: [0, 0, 0],
    key: 0,
  },
  {
    value: [-0.0123, 0.92, 0.3],
    name: "Heart",
    target: [0, 0.82, 0],
    rotation: [0, 0, 0],
    key: 1,
  },
  {
    value: [-0.0123, 1.08, 0.309],
    name: "Head",
    target: [0, 1.05, 0],
    rotation: [0, 0, 0],
    key: 2,
  },
];

const AvaCanvas = (props) => {
  const [backgroundColor, setBackgroundColor] = useState(
    "linear-gradient(#808EA5, #A1B0C6)"
  );
  const [backgroundTexture, setBackGroundTexture] = useState(defaultBackground);
  const [customBackgroundEnable, setCustomBackgroundEnable] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(defaultCamera);
  const [animation, setAnimation] = useState("");

  const orbitControlsRef = useRef(null);

  function updateCamera() {
    console.log(orbitControlsRef.current.object.position);
    orbitControlsRef.current.update();

    // Needs to update perspective Camera .updateProjectionMatrix ()
  }

  function updateAnimationList(list) {
    if (list[0]) {
      updateAnimation(list[0]);
      console.log(list[0]);
    }
  }

  function updateCameraAnimation(cameraKey) {
    const camera = orbitControlsRef.current;
    const coords = {
      x: camera.object.position.x,
      y: camera.object.position.y,
      z: camera.object.position.z,
    };
    const rotation = {
      x: camera.object.rotation.x,
      y: camera.object.rotation.y,
      z: camera.object.rotation.z,
    };
    const target = {
      x: camera.target.x,
      y: camera.target.y,
      z: camera.target.z,
    };

    console.log(camera);
    console.log(rotation);
    console.log(coords);
    console.log(target);

    new TWEEN.Tween(target)
      .to({
        x: cameraKey.target[0],
        y: cameraKey.target[1],
        z: cameraKey.target[2],
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => camera.target.set(target.x, target.y, target.z))
      .start();

    new TWEEN.Tween(coords)
      .to({
        x: cameraKey.value[0],
        y: cameraKey.value[1],
        z: cameraKey.value[2],
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => camera.object.position.set(coords.x, coords.y, coords.z))
      .start();

    new TWEEN.Tween(rotation)
      .to({
        x: cameraKey.rotation[0],
        y: cameraKey.rotation[1],
        z: cameraKey.rotation[2],
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.object.rotation.set(rotation.x, rotation.y, rotation.z);
        camera.update();
      })
      .start();
  }

  function updateAnimation(animationName) {
    setAnimation(animationName);
    // setBackgroundColor("909FB6");
  }
  function Dolly() {
    useFrame((state) => {
      // orbitControlsRef.current.target.y = orbitControlsRef.current.target.y + 0.001;
      orbitControlsRef.current.update();
      TWEEN.update();
      // state.camera.translateY(0.1);
      // console.log(orbitControlsRef);
      // console.log(state.camera); //x: -0.01228111897555405, y: 0.9504616405180882, z: 0.3090214385522207;
      // console.log(state.clock.elapsedTime % 60);
    });
    return null;
  }

  return (
    <div
      className="canvas"
      style={{
        background: backgroundColor,
      }}
    >
      <AvaInterface
        defaultCameras={defaultCameras}
        defaultBackgrounds={defaultBackgrounds}
        backgroundTexture={backgroundTexture}
        setBackGround={setBackGroundTexture}
        cameraPosition={cameraPosition}
        updateCamera={updateCamera}
        setCustomBackgroundEnable={setCustomBackgroundEnable}
        setCameraPosition={setCameraPosition}
        updateAnimation={updateAnimation}
        animation={animation}
        updateCameraPosition={updateCameraAnimation}
      />
      <Canvas id="canvas" shadows>
        <ambientLight intensity={1} />
        <directionalLight intensity={5} />
        <Suspense fallback={Loading}>
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={50}
          ></PerspectiveCamera>
          {customBackgroundEnable && (
            <Environment
              preset={backgroundTexture}
              background={true}
              ground={{
                height: 1.2, // Height of the camera that was used to create the env map (Default: 15)
                radius: 3, // Radius of the world. (Default 60)
                scale: 1200, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
              }}
            ></Environment>
          )}
          <Float
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            rotationIntensity={0}
            floatIntensity={0}
            speed={4}
          >
            <Item
              name={"stealth"}
              collection={"Testing"}
              setAnimations={updateAnimationList}
              animation={animation}
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
          ref={orbitControlsRef}
          minPolarAngle={angleToRadians(20)}
          maxPolarAngle={angleToRadians(90)}
          target={[0, 0.8, 0]}
          enableZoom={true}
          enablePan={false}
          maxDistance={6}
          minDistance={0.25}
        />
        <Dolly />
      </Canvas>
    </div>
  );
};

export default AvaCanvas;
