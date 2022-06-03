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
import Item from "../Item";
import * as TWEEN from "@tweenjs/tween.js";

const defaultCamera = [-0.35, 1.4, 2.2];
const defaultBackground = "dawn";

const defaultCameras = [
  {
    value: [-0.35, 1.4, 2.2],
    name: "Default",
    target: [0, 0.8, 0],
    rotation: [0, 0, 0],
    rotate: true,
    key: 0,
    next: 1,
  },
  {
    value: [-0.0123, 0.92, 0.3],
    name: "Heart",
    target: [0, 0.82, 0],
    rotation: [0, 0, 0],
    rotate: false,
    key: 1,
    next: 2,
  },
  {
    value: [-0.0123, 1.08, 0.309],
    name: "Head",
    target: [0, 1.05, 0],
    rotation: [0, 0, 0],
    rotate: false,
    key: 2,
    next: 0,
  },
];
const backgroundColor = "#010101";

const backgroundTexture = defaultBackground;
const customBackgroundEnable = false;
const maxCameraDistance = 4;
const minCameraDistance = 0.3;
const cameraTolerance = 0.1;

const {
  calcPlaneDistance,
  cubeRootCoords,
  calcNewCoords,
} = require("../../utils/canvasFunctions");

const AvaCanvas = (props) => {
  const [cameraPosition, setCameraPosition] = useState(defaultCamera);
  const [animation, setAnimation] = useState("");
  const [cameraAngle, setCameraAngle] = useState(Math.PI / 2);
  const [cameraZoom, setCameraZoom] = useState(1);
  const orbitControlsRef = useRef(null);
  const [selectedCamera, setSelectedCamera] = useState("Default");
  const [autoRotate, setAutoRotate] = useState(true);

  function updateAutoRotate(rotate) {
    // console.log(rotate);
    orbitControlsRef.current.autoRotate = rotate;
    setAutoRotate(rotate);
    orbitControlsRef.current.update();
  }

  function updateAnimationList(list) {
    if (list[0]) {
      updateAnimation(list[0]);
    }
  }

  function zoomIntoTarget(cameraName) {
    var cameraToZoom = defaultCameras.filter(
      (camera) => camera.name === cameraName
    )[0];
    var target = cameraToZoom.target;

    updateAutoRotate(false); // Set autoRotate to false is zoom is close

    const camera = orbitControlsRef.current;
    const coords = {
      x: camera.object.position.x,
      y: camera.object.position.y,
      z: camera.object.position.z,
    };
    var newCoords = calcNewCoords(coords, target, true);

    if (calcPlaneDistance(newCoords) < minCameraDistance) {
      return;
    }
    new TWEEN.Tween(coords)
      .to({
        x: newCoords.x,
        y: newCoords.y,
        z: newCoords.z,
      })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => camera.object.position.set(coords.x, coords.y, coords.z))
      .start();
  }

  function zoomAwayFromTarget(cameraName) {
    var cameraToZoom = defaultCameras.filter(
      (camera) => camera.name === cameraName
    )[0];
    var target = cameraToZoom.target;

    updateAutoRotate(false); // Set autoRotate to false is zoom is close

    const camera = orbitControlsRef.current;
    const coords = {
      x: camera.object.position.x,
      y: camera.object.position.y,
      z: camera.object.position.z,
    };

    var newCoords = calcNewCoords(coords, target, false);

    if (calcPlaneDistance(newCoords) - cameraTolerance > maxCameraDistance) {
      return;
    }

    new TWEEN.Tween(coords)
      .to({
        x: newCoords.x,
        y: newCoords.y,
        z: newCoords.z,
      })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => camera.object.position.set(coords.x, coords.y, coords.z))
      .start();
  }

  function updateCameraAnimation(cameraKey) {
    setSelectedCamera(cameraKey.name);
    updateAutoRotate(cameraKey.rotate);
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
      // console.log(orbitControlsRef.current);
      setCameraAngle(orbitControlsRef.current.getPolarAngle());
      setCameraZoom(
        defaultCamera[2] /
          cubeRootCoords(
            orbitControlsRef.current.object.position,
            cameraPosition
          )
      );
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
      {/* <Loading /> */}
      <AvaInterface
        defaultCameras={defaultCameras}
        updateCameraPosition={updateCameraAnimation}
        setCameraPosition={setCameraPosition}
        cameraAngle={cameraAngle}
        cameraZoom={cameraZoom}
        selectedCamera={selectedCamera}
      />
      <Canvas id="canvas" shadows position={[0, -1, 0]}>
        <ambientLight intensity={1} />
        <directionalLight intensity={5} />
        <Suspense fallback={null}>
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
          enablePan={true}
          maxDistance={maxCameraDistance}
          minDistance={minCameraDistance}
          autoRotate={autoRotate}
        />
        <Dolly />
      </Canvas>
    </div>
  );
};

export default AvaCanvas;
