import { ReactComponent as DiscDefault } from "../images/fi_disc.svg";
import { ReactComponent as TargetDefault } from "../images/fi_target.svg";
import { ReactComponent as HexagonDefault } from "../images/fi_hexagon.svg";
import { ReactComponent as EllipseDefault } from "../images/fi_ellipse.svg";

import Ellipse from "../images/ellipse.png";
// import { ReactComponent as MinusDefault } from "../images/fi_minus.svg";
// import { ReactComponent as PlusDefault } from "../images/fi_plus.svg";
import { ReactComponent as AvaDefault } from "../images/fi_ava.svg";
import { radToDegrees } from "../utils/radToAngle";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const AvaInterface = ({
  defaultCameras,
  setCameraPosition,
  updateCameraPosition,
  cameraAngle,
  cameraZoom,
  selectedCamera,
  initialState = (active) => active,
}) => {
  const { active, progress } = useProgress();
  const [nextCameraState, setCameraState] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let t;
    if (active !== loading) t = setTimeout(() => setLoading(active), 100);
    return () => clearTimeout(t);
  }, [loading, active]);

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
        {loading ? (
          <div className="interface-ava-button-1">
            <img src={Ellipse} className="ava-ellipse ava-icon" />
          </div>
        ) : (
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
        )}
      </div>
      <div className="interface-right"></div>
      {loading === false && (
        <div className="ava-text">
          {radToDegrees(cameraAngle).toFixed(0)}°{(cameraZoom * 100).toFixed(0)}
          %
        </div>
      )}

      <div className="ava-text-logo">
        <AvaDefault />
      </div>
    </div>
  );
};
export default AvaInterface;
