import {
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useState } from "react";

const defaultBackgrounds = [
  "sunset",
  "dawn",
  "night",
  "warehouse",
  "forest",
  "apartment",
  "studio",
  "city",
  "park",
  "lobby",
];

const defaultCameras = [
  {
    value: [0, 10, 18],
    name: "default",
    key: 0,
  },
  {
    value: [2, 8, 10],
    name: "front",
    key: 1,
  },
  {
    value: [-2, 8, -10],
    name: "back",
    key: 2,
  },
  {
    value: [-10, 6, 0],
    name: "left",
    key: 3,
  },
  {
    value: [10, 6, 0],
    name: "right",
    key: 4,
  },
  {
    value: [0, 18, 0],
    name: "top",
    key: 5,
  },
];

const defaultAnimations = ["Idle", "Dance", "Run", "HipHopDance"];

const Interface = ({
  setBackGround,
  setCustomBackgroundEnable,
  updateCamera,
  updateAutoRotate,
  updateAnimation,
  setCameraPosition,
}) => {
  const [camera, setCamera] = useState("default");
  const [autorotate, setAutorotate] = useState(false);
  const [environment, setEnvironment] = useState("dawn");
  const [animation, setAnimation] = useState("Idle");

  function handleBackgroundChange(e) {
    console.log(e.target.value);
    setBackGround(e.target.value);
    setCustomBackgroundEnable(true);
    setEnvironment(e.target.value);
  }

  function handleCameraChange(e) {
    console.log(
      defaultCameras.filter((camera) => camera.name === e.target.value)[0].name
    );
    setCameraPosition(
      defaultCameras.filter((camera) => camera.name === e.target.value)[0].value
    );
    setCamera(
      defaultCameras.filter((camera) => camera.name === e.target.value)[0].name
    );
    updateCamera();
  }
  function handleAnimationChange(e) {
    console.log(e.target.value);
    updateAnimation(e.target.value);
    setAnimation(e.target.value);
  }

  function handleAutoRotateChange(e) {
    setAutorotate(!e.target.value);
    updateAutoRotate();
  }

  return (
    <div className="interface">
      <div className="interface-item">
        <FormControl fullWidth className="interface-select">
          <InputLabel id="demo-simple-select-label">Environment</InputLabel>
          <Select
            label="Camera"
            value={environment}
            onChange={handleBackgroundChange}
          >
            {defaultBackgrounds.map((background) => (
              <MenuItem value={background} key={Math.random()}>
                {background}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="interface-item">
        <FormControl fullWidth className="interface-select">
          <InputLabel id="demo-simple-select-label">Camera</InputLabel>
          <Select label="Camera" value={camera} onChange={handleCameraChange}>
            {defaultCameras.map((camera) => (
              <MenuItem value={camera.name} key={camera.key}>
                {camera.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <FormGroup className="interface-item">
        <FormControlLabel
          onChange={handleAutoRotateChange}
          control={<Switch value={autorotate} />}
          label="Auto-Rotate"
        />
      </FormGroup>
      <div className="interface-item">
        <FormControl fullWidth className="interface-select">
          <InputLabel id="demo-simple-select-label">Animation</InputLabel>
          <Select
            label="Camera"
            value={animation}
            onChange={handleAnimationChange}
          >
            {defaultAnimations.map((animation) => (
              <MenuItem value={animation} key={Math.random()}>
                {animation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
export default Interface;
