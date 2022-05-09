import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Item = (props) => {
  const gltf = useLoader(
    GLTFLoader,
    "http://localhost:4000/api/collection/" +
      props.collection +
      "/item/" +
      props.name
  );
  return <primitive object={gltf.scene} />;
};
export default Item;
