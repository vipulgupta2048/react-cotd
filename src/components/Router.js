import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import App from "./App.js";
import NotFound from "./NotFound.js";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/cotd" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
