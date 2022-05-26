import { BrowserRouter, Route, Switch } from "react-router-dom";

import StakingCanvas from "./components/canvases/StakingCanvas.js";
import Canvas from "./components/canvases/Canvas.js";
import AvaCanvas from "./components/canvases/AvaCanvas.js";
import Upload from "./components/Upload.js";

import "./app_styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const collection = "Testing";
const item = "42";
const App = () => {
  function withProps(Component, props) {
    return function (matchProps) {
      return <Component {...props} {...matchProps} />;
    };
  }
  return (
    <BrowserRouter>
      <Switch className="content">
        <Route
          exact
          path="/"
          component={withProps(AvaCanvas, { collection, item })}
        />
        <Route path="/staking/:collection/:item" component={StakingCanvas} />

        <Route path="/collection/:collection/:item" component={Canvas} />
        <Route path="/viewer/ava/:item" component={AvaCanvas} />

        <Route path="/upload" component={Upload} />
        {/* <Route path="/preview/:item" component={UploadCanvas} /> */}
        {/* <Route path="/hoverboard" component={HoverboardCanvas} />
        <Route path="/jetpack/:item" component={JetpackCanvas} />
        <Route path="/jetpack" component={JetpackCanvas} />
        <Route path="/ava/:key" component={AvaCanvas} />
        <Route path="/ava" component={AvaCanvas} />
        <Route path="/hoverboard/:key" component={HoverboardCanvas} />
        <Route path="/hoverboard" component={HoverboardCanvas} /> */}
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
