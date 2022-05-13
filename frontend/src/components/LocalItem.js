import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";

const LocalItem = ({ selectedFile }) => {
  const group = useRef();
  console.log(selectedFile);
  const { scene } = useLoader(
    GLTFLoader,
    "https://jadu-web-api.herokuapp.com/" + selectedFile
  );

  return (
    <group ref={group} dispose={null}>
      <primitive scale={1} object={scene} />
    </group>
  );
};
export default LocalItem;
