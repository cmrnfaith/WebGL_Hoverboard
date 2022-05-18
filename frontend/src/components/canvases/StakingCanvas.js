import { angleToRadians } from "../../utils/angle";
import hexToRGB from "../../utils/hexToRGB";
import scale from "../../utils/item_config.json";
// import StakedItem from "../StakedItem";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    mesh: { r: 0, g: 4, b: 0 },
  },
});

function StakedItem({ collection, name }) {
  const ref = useRef();
  const snap = useSnapshot(state);
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { scene, nodes, materials } = useLoader(
    GLTFLoader,
    "https://jadu-web-api.herokuapp.com/api/collection/" +
      collection +
      "/" +
      name
  );
  const [materialState, setMaterialState] = useState(materials);
  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(t / 1.5) / 20;
    ref.current.rotation.x = Math.sin(t / 4) / 8;
    ref.current.rotation.y = Math.sin(t / 4) / 8;
    ref.current.position.y = Math.sin(t / 1.5) / 10;
    var tempMaterial = materialState;
    tempMaterial.Jetpack_White_NoStraps.color = snap.items.mesh;
    // console.log(tempMaterial.Jetpack_White_NoStraps.color);
    setMaterialState(tempMaterial);
  });

  // Cursor showing current color
  const [hovered, set] = useState(null);
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
        cursor
      )}'), auto`;
      return () =>
        (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
          auto
        )}'), auto`);
    }
  }, [hovered]);

  // Using the GLTFJSX output here to wire in app-state and hook up events
  console.log(materialState.Jetpack_White_NoStraps);
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (
        e.stopPropagation(), (state.current = e.object.material.name)
      )}
    >
      {nodes.White.geometry ? (
        <mesh
          scale={scale[collection].scale}
          geometry={nodes.White.geometry}
          material={materialState.Jetpack_White_NoStraps}
        />
      ) : (
        <primitive
          scale={scale[collection].scale}
          object={scene}
          receiveShadow
          castShadow
          // material-color={snap.items.mesh}
        />
      )}
    </group>
  );
}

function Picker() {
  const snap = useSnapshot(state);
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker
        className="picker"
        color={snap.items[snap.current]}
        onChange={(color) => (state.items.mesh = hexToRGB(color))} //(state.items[snap.current] = hexToRGB(color))
      />
      <h1>Jetpack</h1>
      <h2>
        Color: (R: {snap.items.mesh.r}, G: {snap.items.mesh.g}, B:
        {snap.items.mesh.b})
      </h2>
    </div>
  );
}

const StakingCanvas = (props) => {
  const orbitControlsRef = useRef(null);
  return (
    <div className="staking">
      <Canvas shadows dpr={[1, 2]}>
        <OrbitControls ref={orbitControlsRef} autoRotate={false}>
          <mesh position={[0, 0.5, 0]}></mesh>
        </OrbitControls>
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <StakedItem
            name={
              props.match.params.item ? props.match.params.item : props.item
            }
            collection={
              props.match.params.collection
                ? props.match.params.collection
                : props.collection
            }
          />
          <Environment preset="city" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={1.5}
            far={0.8}
          />
        </Suspense>
        <OrbitControls
          minPolarAngle={angleToRadians(0)}
          maxPolarAngle={angleToRadians(70)}
          target={[0, 0, 0]}
          enableZoom={true}
          enablePan={false}
          maxDistance={6}
          minDistance={1.5}
        />
      </Canvas>
      <Picker />
    </div>
  );
};

export default StakingCanvas;
