import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App.js";
import NotFound from "./NotFound.js";
import Welcome from "./Welcome.js";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/cotd" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
