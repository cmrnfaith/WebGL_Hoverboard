import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";

import scale from "../utils/item_config.json";

const StakedItem = ({ collection, name }) => {
  const group = useRef();

  const { scene } = useLoader(
    GLTFLoader,
    "https://jadu-web-api.herokuapp.com/api/collection/" +
      collection +
      "/" +
      name
  );

  return (
    <group ref={group} dispose={null}>
      <primitive scale={scale[collection].scale} object={scene} />
    </group>
  );
};
export default StakedItem;
