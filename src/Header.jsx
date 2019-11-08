import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const activeStyle = { color: "#5bffd5" };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink to="/" exact className="navbar-brand">
        <i>xf</i>BBQ
      </NavLink>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01" style={{}}>
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <NavLink
              to="/CurrentOrder"
              activeStyle={activeStyle}
              className="nav-link"
            >
              Current Order
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/UserRegistrationForm"
              activeStyle={activeStyle}
              className="nav-link"
            >
              New User Registration
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/UsersList"
              activeStyle={activeStyle}
              className="nav-link"
            >
              Users
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/BBQRegistrationForm"
              activeStyle={activeStyle}
              className="nav-link"
            >
              Create New BBQ
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/BBQList"
              activeStyle={activeStyle}
              className="nav-link"
            >
              BBQs
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/NewOrderForm"
              activeStyle={activeStyle}
              className="nav-link"
            >
              Place an Order
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/OrderHistory"
              activeStyle={activeStyle}
              className="nav-link"
            >
              Order History
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
