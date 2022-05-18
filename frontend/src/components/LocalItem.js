import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useEffect } from "react";
import { useAnimations } from "@react-three/drei";

const LocalItem = ({ animation, setAnimations, selectedFile }) => {
  const group = useRef();
  console.log(selectedFile);
  const { animations, scene } = useLoader(
    GLTFLoader,
    "https://jadu-web-api.herokuapp.com/" + selectedFile
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
  }, [animation]);
  useEffect(() => {
    setAnimations(names);
  }, []);

  return (
    <group ref={group} dispose={null}>
      <primitive scale={1} object={scene} />
    </group>
  );
};
export default LocalItem;
