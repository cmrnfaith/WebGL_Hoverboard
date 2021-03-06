import {
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  TextField,
} from "@mui/material";

import { useState } from "react";

const PreviewInterface = ({
  setBackgroundColor,
  backgroundColorOne,
  setBackgroundColorOne,
  backgroundColorTwo,
  setBackgroundColorTwo,
  lightPosition,
  setLightPosition,
  directionalLightIntensity,
  setDirectionalLightIntensity,
  ambientLightIntensity,
  setAmbientLightIntensity,
  shadowScale,
  setShadowScale,
  shadowBlur,
  setShadowBlur,
  shadowFar,
  setShadowFar,
}) => {
  const [backgroundType, setBackgroundType] = useState("gradient");
  const [lightX, setLightX] = useState(lightPosition[0]);
  const [lightY, setLightY] = useState(lightPosition[1]);
  const [lightZ, setLightZ] = useState(lightPosition[2]);

  function handleBackgroundTypeChange(e) {
    setBackgroundType(e.target.value);
    if (e.target.value === "solid") {
      setBackgroundColor(backgroundColorOne);
    } else {
      setBackgroundColor(
        "linear-gradient(" +
          backgroundColorOne +
          ", " +
          backgroundColorTwo +
          ")"
      );
    }
  }
  function handleColorOneChange(e) {
    // console.log(e.target.value);
    setBackgroundColorOne(e.target.value);
    if (e.target.value === "solid") {
      setBackgroundColor(backgroundColorOne);
    } else {
      setBackgroundColor(
        "linear-gradient(" +
          backgroundColorOne +
          ", " +
          backgroundColorTwo +
          ")"
      );
    }
  }

  function handleColorTwoChange(e) {
    // console.log(e.target.value);
    setBackgroundColorTwo(e.target.value);
    if (e.target.value === "solid") {
    } else {
      setBackgroundColor(
        "linear-gradient(" +
          backgroundColorOne +
          ", " +
          backgroundColorTwo +
          ")"
      );
    }
  }
  function handleShadowScaleChange(e) {
    console.log(e.target.value);
    setShadowScale(e.target.value);
  }

  function handleShadowBlurChange(e) {
    console.log(e.target.value);
    setShadowBlur(e.target.value);
  }
  function handleShadowFarChange(e) {
    console.log(e.target.value);
    setShadowFar(e.target.value);
  }

  function handleDirectionalIntensityChange(e) {
    // console.log(e.target.value);
    setDirectionalLightIntensity(e.target.value);
  }
  function handleAmbientIntensityChange(e) {
    // console.log(e.target.value);
    setAmbientLightIntensity(e.target.value);
  }
  function handleXChange(e) {
    let old_position = lightPosition;
    old_position[0] = e.target.value;
    setLightPosition(old_position);
    setLightX(e.target.value);
    console.log(old_position);
  }
  function handleYChange(e) {
    let old_position = lightPosition;
    old_position[1] = e.target.value;
    setLightPosition(old_position);
    setLightY(e.target.value);
  }
  function handleZChange(e) {
    let old_position = lightPosition;
    old_position[2] = e.target.value;
    setLightPosition(old_position);
    setLightZ(e.target.value);
  }

  return (
    <div className="interface">
      <div className="interface-item">
        <div fullWidth className="interface-select">
          <FormLabel id="demo-controlled-radio-buttons-group">
            BACKGROUND
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={backgroundType}
            onChange={handleBackgroundTypeChange}
          >
            <FormControlLabel
              value="gradient"
              control={<Radio />}
              label="Linear Gradient"
            />
            <FormControlLabel
              value="solid"
              control={<Radio />}
              label="Solid Color"
            />
          </RadioGroup>
        </div>
      </div>
      <div className="interface-item">
        <div fullWidth className="interface-select">
          <FormLabel id="demo-controlled-radio-buttons-group">COLOR</FormLabel>
          <TextField
            id="filled-basic-1"
            label={backgroundType === "gradient" ? "Color One" : "Color"}
            variant="filled"
            value={backgroundColorOne}
            onChange={handleColorOneChange}
          />
          {backgroundType === "gradient" && (
            <TextField
              id="filled-basic-2"
              label="Color Two"
              variant="filled"
              value={backgroundColorTwo}
              onChange={handleColorTwoChange}
            />
          )}
        </div>
      </div>
      <div className="interface-item">
        <div fullWidth className="interface-select">
          <FormLabel id="demo-controlled-radio-buttons-group">
            SHADOWS
          </FormLabel>
          <TextField
            id="filled-basic-1"
            label="Shadow Scale"
            variant="filled"
            type="number"
            value={shadowScale}
            onChange={handleShadowScaleChange}
          />

          <TextField
            id="filled-basic-2"
            label="Shadow Blur"
            variant="filled"
            type="number"
            value={shadowBlur}
            onChange={handleShadowBlurChange}
          />
          <TextField
            id="filled-basic-2"
            label="Shadow Far"
            variant="filled"
            type="number"
            disabled
            value={shadowFar}
            onChange={handleShadowFarChange}
          />
        </div>
      </div>
      <div className="interface-item">
        <div fullWidth className="interface-select">
          <FormLabel id="demo-controlled-radio-buttons-group">
            LIGHTING
          </FormLabel>
          <TextField
            label="A. Intensity"
            variant="filled"
            type="number"
            value={ambientLightIntensity}
            onChange={handleAmbientIntensityChange}
          />
          <TextField
            label="D. Intensity"
            type="number"
            variant="filled"
            value={directionalLightIntensity}
            onChange={handleDirectionalIntensityChange}
          />
          <TextField
            label="X-Coordinate"
            type="number"
            variant="filled"
            value={lightX}
            onChange={handleXChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            label="Y-Coordinate"
            type="number"
            variant="filled"
            value={lightY}
            onChange={handleYChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            label="Z-Coordinate"
            type="number"
            variant="filled"
            value={lightZ}
            onChange={handleZChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </div>
      </div>
    </div>
  );
};
export default PreviewInterface;
