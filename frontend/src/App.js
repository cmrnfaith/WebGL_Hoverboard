import { BrowserRouter, Route, Switch } from "react-router-dom";

import HoverboardCanvas from "./components/canvases/HoverboardCanvas.js";
import JetpackCanvas from "./components/canvases/JetpackCanvas.js";
import AvaCanvas from "./components/canvases/AvaCanvas.js";
import Canvas from "./components/canvases/Canvas.js";

import "./app_styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const item = "white";
const App = () => {
  function withProps(Component, props) {
    return function (matchProps) {
      return <Component {...props} {...matchProps} />;
    };
  }
  return (
    <BrowserRouter>
      <Switch className="content">
        <Route path="/" component={withProps(JetpackCanvas, { item })} />

        <Route path="/collection/:collection/:item" component={Canvas} />
        <Route path="/hoverboard" component={HoverboardCanvas} />
        <Route path="/jetpack/:item" component={JetpackCanvas} />
        <Route path="/jetpack" component={JetpackCanvas} />
        <Route path="/ava/:key" component={AvaCanvas} />
        <Route path="/ava" component={AvaCanvas} />
        <Route path="/hoverboard/:key" component={HoverboardCanvas} />
        <Route path="/hoverboard" component={HoverboardCanvas} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
