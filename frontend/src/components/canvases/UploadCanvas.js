import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useState, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import {
  OrbitControls,
  Float,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import PreviewInterface from "../PreviewInterface";
import { SkeletonHelper } from "three";
import * as TWEEN from "@tweenjs/tween.js";

import Loading from "../Loading";
import LocalItem from "../LocalItem";
const defaultCamera = [0, 0.4, 3.8];
const defaultLightPosition = [0.6, 6.8, 3];
const defaultAnimations = ["", "Idle", "T-Pose"];

const UploadCanvas = (props) => {
  const [cameraYTarget, setCameraYTarget] = useState(0.1);
  const [lightPosition, setLightPosition] = useState(defaultLightPosition);
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(5);
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
  const [backgroundColorOne, setBackgroundColorOne] = useState("#e66465");
  const [backgroundColorTwo, setBackgroundColorTwo] = useState("#9198e5");
  const [backgroundColor, setBackgroundColor] = useState(
    "linear-gradient(#e66465, #9198e5)"
  );
  const [shadowScale, setShadowScale] = useState(15);
  const [shadowBlur, setShadowBlur] = useState(1);
  const [shadowFar, setShadowFar] = useState(8);
  const [animations, setAnimations] = useState(defaultAnimations);
  const [animation, setAnimation] = useState("");
  const [skeletonHelpers, setSkeletonHelpers] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const [content, setContent] = useState(null);
  const [updateState, setUpdateState] = useState(true);
  const orbitControlsRef = useRef(null);

  function Dolly() {
    useFrame((state) => {
      // console.log(orbitControlsRef.current);
      // orbitControlsRef.current.update();
      TWEEN.update();
      state.scene.children.forEach((child) => {
        if (child.type === "DirectionalLight") {
          child.position.x = lightPosition[0];
          child.position.y = lightPosition[1];
          child.position.z = lightPosition[2];
        }
      });

      if (updateState && content) {
        if (skeletonHelpers.length) {
          skeletonHelpers.forEach((helper) => state.scene.remove(helper));
        }
        content.traverse((node) => {
          if (node.isMesh && node.skeleton && skeleton) {
            const helper = new SkeletonHelper(node.skeleton.bones[0].parent);
            helper.material.linewidth = 3;
            state.scene.add(helper);
            skeletonHelpers.push(helper);
          }
        });
        setUpdateState(false);
      }

      // console.log(state.clock.elapsedTime % 60);
    });
    return null;
  }
  function updateSkeleton(value) {
    setSkeleton(value);
    setUpdateState(true);
  }

  function handleCameraTarget(value) {
    setCameraYTarget(value);
    const camera = orbitControlsRef.current;
    const target = {
      x: camera.target.x,
      y: camera.target.y,
      z: camera.target.z,
    };

    new TWEEN.Tween(target)
      .to({
        x: 0,
        y: value,
        z: 0,
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => camera.target.set(target.x, target.y, target.z))
      .start();
  }

  function updateAnimationList(list) {
    if (list[0]) {
      updateAnimation(list[0]);
      console.log(list[0]);
    }
    if (list.length === 0) {
      animation = null;
    }
    setAnimations(list);
  }

  function updateAnimation(animationName) {
    setAnimation(animationName);
  }

  return (
    <div
      className="canvas"
      style={{
        background: backgroundColor,
      }}
    >
      <PreviewInterface
        setBackgroundColor={setBackgroundColor}
        backgroundColorOne={backgroundColorOne}
        setBackgroundColorOne={setBackgroundColorOne}
        backgroundColorTwo={backgroundColorTwo}
        setBackgroundColorTwo={setBackgroundColorTwo}
        lightPosition={lightPosition}
        setLightPosition={setLightPosition}
        directionalLightIntensity={directionalLightIntensity}
        setDirectionalLightIntensity={setDirectionalLightIntensity}
        ambientLightIntensity={ambientLightIntensity}
        setAmbientLightIntensity={setAmbientLightIntensity}
        shadowScale={shadowScale}
        setShadowScale={setShadowScale}
        shadowBlur={shadowBlur}
        setShadowBlur={setShadowBlur}
        shadowFar={shadowFar}
        setShadowFar={setShadowFar}
        defaultAnimations={animations}
        updateAnimation={updateAnimation}
        animation={animation}
        setSkeleton={updateSkeleton}
        skeleton={skeleton}
        cameraYTarget={cameraYTarget}
        setCameraYTarget={handleCameraTarget}
        filename={props.selectedFile}
      />
      <Canvas id="canvas" shadows>
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight
          intensity={directionalLightIntensity}
          position={lightPosition}
        />
        <Suspense fallback={Loading}>
          <PerspectiveCamera
            makeDefault
            position={defaultCamera}
            fov={50}
          ></PerspectiveCamera>
          <Float
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            rotationIntensity={0}
            floatIntensity={0}
            speed={4}
          >
            <LocalItem
              selectedFile={props.selectedFile}
              setAnimations={updateAnimationList}
              animation={animation}
              setContent={setContent}
            />
          </Float>
          <ContactShadows
            opacity={1}
            scale={shadowScale}
            blur={shadowBlur}
            far={shadowFar}
            resolution={256}
            color="#000000"
          />
        </Suspense>
        <OrbitControls
          ref={orbitControlsRef}
          minPolarAngle={angleToRadians(0)}
          maxPolarAngle={angleToRadians(90)}
          target={[0, 0.1, 0]}
          enableZoom={true}
          enablePan={false}
        />
        <Dolly />
      </Canvas>
    </div>
  );
};

export default UploadCanvas;
