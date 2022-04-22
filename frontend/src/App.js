import React from "react";
import { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  productName: "Hoverboard Test",
  companyName: "Cameron",
  loaderUrl: "webgl/Build.loader.js",
  dataUrl: "webgl/Build.data",
  frameworkUrl: "webgl/Build.framework.js",
  codeUrl: "webgl/Build.wasm",
});

function App() {
  // const [isUnityMounted, setIsUnityMounted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    unityContext.on("progress", handleOnUnityProgress);
    unityContext.on("loaded", handleOnUnityLoaded);
  });

  // Built-in event invoked when the Unity app is loaded.
  function handleOnUnityLoaded() {
    setIsLoaded(true);
  }
  // Built-in event invoked when the Unity app's progress has changed.
  function handleOnUnityProgress(progression) {
    setProgression(progression);
  }

  return (
    <div className="unity-container">
      {/* The loading screen will be displayed here. */}
      {/* {isLoaded === false && (
        <div className="loading-overlay">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: progression * 100 + "%" }}
            />
          </div>
        </div>
      )} */}
      {/* The Unity app will be rendered here. */}
      <Unity className="unity-canvas" unityContext={unityContext} />
    </div>
  );
}

export default App;
