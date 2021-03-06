/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/jetpack_" + props.name + ".glb");
  // const { actions } = useAnimations(animations, group);
  // useEffect(() => {
  //   fetch(
  //     "https://us-central1-jadu-e23c4.cloudfunctions.net/getTokenFile?collection=JaduJetpack&tokenID=1",
  //     {
  //       method: "GET", // *GET, POST, PUT, DELETE, etc.
  //       mode: "no-cors",
  //     }
  //   ).then(async (res) => {
  //     let new_link = await res;
  //     console.log(new_link);
  //   });

  //   // actions?.hover.play();
  // });

  return (
    <group ref={group} {...props} dispose={null}>
      {materials.palette && (
        <mesh
          geometry={nodes.Polygon.geometry}
          material={materials.palette}
          position={[0, 1, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
      )}
      {materials.Jetpack_White_NoStraps && (
        <mesh
          geometry={nodes.Jetpack_White_NoStraps.geometry}
          material={materials.Jetpack_White_NoStraps}
          position={[0, -2, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      )}
      {materials["Mat.1"] && (
        <mesh
          geometry={nodes.Polygon.geometry}
          material={materials["Mat.1"]}
          position={[0, -2, -2]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
      )}
    </group>
  );
}
