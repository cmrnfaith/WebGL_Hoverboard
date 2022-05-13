import {
  Switch,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useState } from "react";

const Interface = ({
  defaultBackgrounds,
  defaultCameras,
  defaultAnimations,
  setBackGround,
  setCustomBackgroundEnable,
  updateCamera,
  updateAutoRotate,
  updateAnimation,
  setCameraPosition,
  animation,
}) => {
  const [camera, setCamera] = useState("default");
  const [autorotate, setAutorotate] = useState(false);
  const [environment, setEnvironment] = useState("dawn");

  // useEffect(() => {});

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
  }

  function handleAutoRotateChange(e) {
    setAutorotate(!e.target.value);
    updateAutoRotate();
  }

  return (
    <div className="interface">
      <div className="interface-item">
        <div fullWidth className="interface-select">
          <InputLabel id="demo-simple-select-label">ENVIRONMENT</InputLabel>
          <Select
            label="Camera"
            value={environment}
            onChange={handleBackgroundChange}
          >
            {defaultBackgrounds.map((background) => (
              <MenuItem value={background} key={Math.random()}>
                {background.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="interface-item">
        <div fullWidth className="interface-select">
          <InputLabel id="demo-simple-select-label">CAMERA</InputLabel>
          <Select label="Camera" value={camera} onChange={handleCameraChange}>
            {defaultCameras.map((camera) => (
              <MenuItem value={camera.name} key={camera.key}>
                {camera.name.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="interface-item">
        <FormControlLabel
          onChange={handleAutoRotateChange}
          control={<Switch value={autorotate} />}
          label="AUTO-ROTATE"
        />
      </div>
      <div className="interface-item">
        <div fullWidth className="interface-select">
          <InputLabel id="demo-simple-select-label">ANIMATION</InputLabel>
          <Select
            label="Camera"
            value={animation}
            onChange={handleAnimationChange}
          >
            {defaultAnimations.map((name) => (
              <MenuItem value={name} key={Math.random()}>
                {name.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
export default Interface;
