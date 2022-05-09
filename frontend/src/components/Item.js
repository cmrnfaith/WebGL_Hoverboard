import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import scale from "../utils/item_config.json";

const Item = (props) => {
  const gltf = useLoader(
    GLTFLoader,
    "http://localhost:4000/api/collection/" +
      props.collection +
      "/" +
      props.name
  );
  return (
    <primitive scale={scale[props.collection].scale} object={gltf.scene} />
  );
};
export default Item;
