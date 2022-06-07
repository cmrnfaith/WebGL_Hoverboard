import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useEffect, useState } from "react";
import { useAnimations } from "@react-three/drei";

const LocalItem = ({ animation, setAnimations, selectedFile, setContent }) => {
  // const [points, setPoints] = useState([
  //   [0, 0, 0],
  //   [0, 0, 0],
  //   [0, 0, 0],
  //   [0, 0, 0],
  //   [0, 0.6449969388759389, -0.004960321384256734],
  //   [0.0402095541, -7.9967824e-11, -2.67849437e-17],
  //   [0.08576012402772903, -0.04483000189065934, -0.07087534666061401],
  //   [0.21699172258377075, 0, 0],
  //   [0.2763040363788605, 0, 0],
  //   [0.0650429, 0.0867602453, 5.96579643e-12],
  //   [0.0402095541, -7.9967824e-11, -2.67849437e-17],
  //   [0.08576012402772903, -0.04483000189065934, 0.07087534666061401],
  //   [-0.21699172258377075, 0, 0],
  //   [-0.2763040363788605, 0, 0],
  //   [-0.0650429, -0.0867602453, -1.72742445e-11],
  //   [0, 0.6449969388759389, -0.004960321384256734],
  //   [0.04023774, 1.7763568e-17, -3.77631375e-17],
  //   [0.0690597743, 1.1546319e-16, -5.75983264e-17],
  //   [0.08403786271810532, 0, 0],
  //   [0.0458891951, 0.01837085, 0.0275736563],
  //   [-0.08185002207756042, 0, 0],
  //   [-0.13751822710037231, 0, 0],
  //   [-0.16156046092510223, 0, 0],
  //   [-0.06223159283399582, 0.030399324372410774, 0.0018887144979089499],
  //   [-0.024394063279032707, 0, 0],
  //   [-0.020943088456988335, 0, 0],
  //   [-0.16156046092510223, 0, 0],
  //   [-0.07617420703172684, 0, 0],
  //   [-0.02866169437766075, 0, 0],
  //   [-0.024543566629290584, 0, 0],
  //   [-0.16156046092510223, 0, 0],
  //   [-0.0120428894, -0.0250477828, 0.00003726531],
  //   [-0.030982989817857742, 0, 0],
  //   [-0.026788506656885147, 0, 0],
  //   [-0.16156046092510223, 0, 0],
  //   [-0.0720272958278656, -0.016395781189203262, -0.0007975886692292988],
  //   [-0.02792949415743351, 0, 0],
  //   [-0.023891638964414597, 0, 0],
  //   [-0.16156046092510223, 0, 0],
  //   [-0.0727120116353035, 0.017693169414997104, 0.000997993047349155],
  //   [-0.02657274715602398, 0, 0],
  //   [-0.022901911288499832, 0, 0],
  //   [0.08403786271810532, 0, 0],
  //   [0.0458891951, 0.01837085, -0.0275736563],
  //   [0.08185002207756042, 0, 0],
  //   [0.13751822710037231, 0, 0],
  //   [0.16156046092510223, 0, 0],
  //   [0.06223159283399582, -0.030399324372410774, -0.0018887144979089499],
  //   [0.024394063279032707, 0, 0],
  //   [0.020943088456988335, 0, 0],
  //   [0.16156046092510223, 0, 0],
  //   [0.0727120116353035, -0.017693169414997104, -0.000997993047349155],
  //   [0.02657274715602398, 0, 0],
  //   [0.022901911288499832, 0, 0],
  //   [0.16156046092510223, 0, 0],
  //   [0.07617420703172684, 0, 0],
  //   [0.02866169437766075, 0, 0],
  //   [0.024543566629290584, 0, 0],
  //   [0.16156046092510223, 0, 0],
  //   [0.0120428894, 0.0250477828, -0.00003726531],
  //   [0.030982989817857742, 0, 0],
  //   [0.026788506656885147, 0, 0],
  //   [0.16156046092510223, 0, 0],
  //   [0.0720272958278656, 0.016395781189203262, 0.0007975886692292988],
  //   [0.02792949415743351, 0, 0],
  //   [0.023891638964414597, 0, 0],
  //   [0.08403786271810532, 0, 0],
  //   [0.121170945, 1.06581408e-16, 1.46549432e-16],
  //   [0.03746524825692177, 0, 0],
  // ]);
  const group = useRef();
  // console.log(selectedFile);
  var tempPoints = [];

  function printGraph(node) {
    console.group(" <" + node.type + "> " + node.position);
    node.children.forEach((child) => printGraph(child));
    console.groupEnd();
  }

  function updateSkeleton(tree) {
    tempPoints = [];
    updateSkeletonGraph(tree, tempPoints);
    console.log(tempPoints);
    // setPoints(tempPoints);
  }

  async function updateSkeletonGraph(node, pointsRef) {
    console.group(" <" + node.type + "> " + node.name);

    node.children.forEach((child) => {
      // console.log(node);
      if (node.type == "Bone") {
        console.log([node.position.x, node.position.y, node.position.z]);
        tempPoints = [
          ...tempPoints,
          [node.position.x, node.position.y, node.position.z],
        ];
      }
      updateSkeletonGraph(child, pointsRef);
    });

    console.groupEnd();
    return null;
  }

  const { animations, scene, nodes } = useLoader(
    GLTFLoader,
    "https://jadu-web-api.herokuapp.com/" + selectedFile
  );
  setContent(scene);
  const { actions, names } = useAnimations(animations, group);
  // updateSkeleton(scene);
  // console.log(points);

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
    if (names.length > 0) {
      setAnimations(names);
    }
  }, []);

  return (
    <group ref={group} dispose={null}>
      <primitive scale={1} object={scene} />
    </group>
  );
};
export default LocalItem;
