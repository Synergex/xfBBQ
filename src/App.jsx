import React from "react";
import { Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import PageNotFound from "./PageNotFound";
import HomePage from "./components/home/HomePage";

import UserRegistrationForm from "./components/users/UserRegistrationForm";
import UserList from "./components/users/UsersList";
import BBQList from "./components/bbq/BBQList";
import OrderHistory from "./components/orders/OrderHistory";

export default function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/UserRegistrationForm" component={UserRegistrationForm} />
        <Route path="/UsersList" component={UserList} />
        <Route path="/BBQList" component={BBQList} />
        <Route path="/OrderHistory" component={OrderHistory} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={5000} />
    </div>
  );
}
