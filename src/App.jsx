import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import PageNotFound from "./PageNotFound";
import HomePage from "./components/home/HomePage";

import OrderHistory from "./components/orders/OrderHistory";

const App = () => (
  <div className="container-fluid">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/OrderHistory" component={OrderHistory} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;
