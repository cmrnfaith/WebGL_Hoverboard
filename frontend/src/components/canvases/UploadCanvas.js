import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import { angleToRadians } from "../../utils/angle";
import {
  OrbitControls,
  Float,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import PreviewInterface from "../PreviewInterface";

import Loading from "../Loading";
import LocalItem from "../LocalItem";
const defaultCamera = [0, 0.4, 3.8];
const defaultLightPosition = [0.6, 6.8, 3];

const UploadCanvas = (props) => {
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

  function Dolly() {
    useFrame((state) => {
      state.scene.children.forEach((child) => {
        if (child.type === "DirectionalLight") {
          child.position.x = lightPosition[0];
          child.position.y = lightPosition[1];
          child.position.z = lightPosition[2];
        }
      });

      // console.log(state);
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
      />
      <Canvas id="canvas" shadows>
        <OrbitControls autoRotate={false}>
          <mesh position={[0, 0.5, 0]}></mesh>
        </OrbitControls>
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
            <LocalItem selectedFile={props.selectedFile} />
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
          minPolarAngle={angleToRadians(0)}
          maxPolarAngle={angleToRadians(90)}
          target={[0, 0.4, 0]}
          enableZoom={true}
          enablePan={false}
          maxDistance={6}
          minDistance={1.5}
        />
        <Dolly />
      </Canvas>
    </div>
  );
};

export default UploadCanvas;
