import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import isEmpty from "./scripts/isEmpty";

import Header from "./Header";
import PageNotFound from "./PageNotFound";
import LoginPage from "./components/login/UserLogin";
import HomePage from "./components/home/HomePage";

import UserRegistrationForm from "./components/users/UserRegistrationForm";
import UserList from "./components/users/UsersList";

import BBQRegistrationForm from "./components/bbq/BBQRegistrationForm";
import BBQList from "./components/bbq/BBQList";

import NewOrderForm from "./components/orders/NewOrderForm";
import OrderHistory from "./components/orders/OrderHistory";

import LogoutPage from "./components/login/UserLogout";

export default function App() {
  const login = useSelector(state => state.login);

  return (
    <div className="container-fluid">
      <Header />
      {isEmpty(login) ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/UserRegistrationForm"
            component={UserRegistrationForm}
          />
          <Route path="/Login" component={LoginPage} />
          <Route component={PageNotFound} />
        </Switch>
      ) : login.type === "Administrator" ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/UserRegistrationForm"
            component={UserRegistrationForm}
          />
          <Route path="/UsersList" component={UserList} />
          <Route path="/BBQRegistrationForm" component={BBQRegistrationForm} />
          <Route path="/BBQList" component={BBQList} />
          <Route path="/NewOrderForm" component={NewOrderForm} />
          <Route path="/OrderHistory" component={OrderHistory} />
          <Route path="/Logout" component={LogoutPage} />
          <Route component={PageNotFound} />
        </Switch>
      ) : login.type !== "Attendee" ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/BBQRegistrationForm" component={BBQRegistrationForm} />
          <Route path="/BBQList" component={BBQList} />
          <Route path="/NewOrderForm" component={NewOrderForm} />
          <Route path="/OrderHistory" component={OrderHistory} />
          <Route path="/Logout" component={LogoutPage} />
          <Route component={PageNotFound} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/NewOrderForm" component={NewOrderForm} />
          <Route path="/OrderHistory" component={OrderHistory} />
          <Route path="/Logout" component={LogoutPage} />
          <Route component={PageNotFound} />
        </Switch>
      )}
      <ToastContainer hideProgressBar />
    </div>
  );
}
