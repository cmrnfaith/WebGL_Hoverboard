import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";

import scale from "../utils/item_config.json";

const Item = ({ animation, setAnimations, collection, name }) => {
  // useFrame(({ clock }) => {
  //   const a = clock.getElapsedTime();
  //   // console.log(a); // the value will be 0 at scene initialization and grow each frame
  //   //
  // });
  const group = useRef();

  const { animations, scene } = useLoader(
    GLTFLoader,
    "https://jadu-web-api.herokuapp.com/api/collection/" +
      collection +
      "/" +
      name
  );
  const { actions, names } = useAnimations(animations, group);
  useEffect(() => {
    console.log(actions);

    if (actions[animation]) {
      for (const animation of names) {
        actions[animation].stop();
      }
      actions[animation].play();
    }
    // actions
  }, [animation, actions, names]);
  useEffect(() => {
    setAnimations(names);
  }, [names, setAnimations]);
  console.log(animations);
  return (
    <group ref={group} dispose={null}>
      <primitive scale={scale[collection].scale} object={scene} />
    </group>
  );
};
export default Item;
