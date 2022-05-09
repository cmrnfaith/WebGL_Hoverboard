import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HoverboardCanvas from "./components/canvases/HoverboardCanvas.js";
import JetpackCanvas from "./components/canvases/JetpackCanvas.js";
import AvaCanvas from "./components/canvases/AvaCanvas.js";
import Canvas from "./components/canvases/Canvas.js";

import "./app_styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch className="content">
        <Route exact path="/">
          <Redirect to="/collection/JaduJetpack/item/white" />
        </Route>

        <Route path="/collection/:collection/item/:item" component={Canvas} />
        <Route path="/hoverboard" component={HoverboardCanvas} />

        <Route path="/jetpack/:key" component={JetpackCanvas} />
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
