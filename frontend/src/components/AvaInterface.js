import { ReactComponent as DiscDefault } from "../images/fi_disc.svg";
import { ReactComponent as TargetDefault } from "../images/fi_target.svg";
import { ReactComponent as HexagonDefault } from "../images/fi_hexagon.svg";
// import { ReactComponent as MinusDefault } from "../images/fi_minus.svg";
// import { ReactComponent as PlusDefault } from "../images/fi_plus.svg";
import { ReactComponent as AvaDefault } from "../images/fi_ava.svg";
import { radToDegrees } from "../utils/radToAngle";
import { useState } from "react";

const AvaInterface = ({
  defaultCameras,
  setCameraPosition,
  updateCameraPosition,
  cameraAngle,
  cameraZoom,
  selectedCamera,
}) => {
  // useEffect(() => {});
  const [nextCameraState, setCameraState] = useState(1);

  function handleCameraChange() {
    var newCamera = defaultCameras.filter(
      (camera) => camera.key === nextCameraState
    )[0];
    console.log(newCamera);
    setCameraPosition(newCamera.value);

    updateCameraPosition(newCamera);
    setCameraState(newCamera.next);
  }

  return (
    <div className="interface-ava">
      <div className="interface-left">
        <div
          className={
            selectedCamera === "Head"
              ? "interface-ava-button-1 interface-selected-button"
              : "interface-ava-button-1"
          }
          onClick={() => {
            handleCameraChange();
          }}
        >
          {nextCameraState === 1 && (
            <HexagonDefault className="ava-icon interface-selected-camera" />
          )}
          {nextCameraState === 2 && (
            <TargetDefault className="ava-icon interface-selected-camera" />
          )}
          {nextCameraState === 0 && (
            <DiscDefault className="ava-icon interface-selected-camera" />
          )}
        </div>

        {/* <div
          className={
            selectedCamera === "Heart"
              ? "interface-ava-button-2 interface-selected-button"
              : "interface-ava-button-2"
          }
          onClick={() => {
            handleCameraChange("Heart");
          }}
        >
          <TargetDefault
            className={
              selectedCamera === "Heart"
                ? "ava-icon interface-selected-camera"
                : "ava-icon"
            }
          />
        </div> */}

        {/* <div
          className={
            selectedCamera === "Default"
              ? "interface-ava-button-3 interface-selected-button"
              : "interface-ava-button-3"
          }
          onClick={() => {
            handleCameraChange("Default");
          }}
        >
          <HexagonDefault
            className={
              selectedCamera === "Default"
                ? "ava-icon interface-selected-camera"
                : "ava-icon"
            }
          />
        </div> */}
      </div>
      <div className="interface-right">
        {/* <div
          className="ava-plus-icon"
          onClick={() => {
            zoomIn(selectedCamera);
          }}
        >
          <PlusDefault />
        </div>
        <div
          className="ava-minus-icon"
          onClick={() => {
            zoomOut(selectedCamera);
          }}
        >
          <MinusDefault />
        </div> */}
      </div>
      <div className="ava-text">
        {radToDegrees(cameraAngle).toFixed(0)}°{(cameraZoom * 100).toFixed(0)}%
      </div>

      <div className="ava-text-logo">
        <AvaDefault />
      </div>
    </div>
  );
};
export default AvaInterface;
