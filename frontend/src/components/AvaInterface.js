import { InputLabel, Select, MenuItem, Button } from "@mui/material";
import { update } from "@tweenjs/tween.js";

import { useState } from "react";

const AvaInterface = ({
  defaultCameras,
  setCameraPosition,
  updateCameraPosition,
}) => {
  // useEffect(() => {});

  function handleCameraChange(new_camera) {
    console.log(
      defaultCameras.filter((camera) => camera.name === new_camera)[0]
    );
    setCameraPosition(
      defaultCameras.filter((camera) => camera.name === new_camera)[0].value
    );

    updateCameraPosition(
      defaultCameras.filter((camera) => camera.name === new_camera)[0]
    );

    // updateCamera();
  }

  return (
    <div className="interface-ava">
      <div className="interface-item">
        <div className="interface-select">
          <Button
            variant="outlined"
            onClick={() => {
              handleCameraChange("Heart");
            }}
          >
            HEART
          </Button>
        </div>
      </div>
      <div className="interface-item">
        <div className="interface-select">
          <Button
            variant="outlined"
            onClick={() => {
              handleCameraChange("Head");
            }}
          >
            MIND
          </Button>
        </div>
      </div>
      <div className="interface-item">
        <div className="interface-select">
          <Button
            variant="outlined"
            onClick={() => {
              handleCameraChange("Default");
            }}
          >
            SOUL
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AvaInterface;
