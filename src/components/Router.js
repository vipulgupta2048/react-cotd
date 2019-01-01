import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import StorePicker from "./StorePicker.js";
import App from "./App.js";
import NotFound from "./NotFound.js";

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={StorePicker} /> */}
      <Route path="/" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
