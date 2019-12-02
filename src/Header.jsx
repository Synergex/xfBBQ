import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "./scripts/isEmpty";

export default function Header() {
  const activeStyle = { color: "#5bffd5" };
  const login = useSelector(state => state.login);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {isEmpty(login) ? (
        <>
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
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarColor01"
            style={{}}
          >
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <NavLink
                  to="/Login"
                  activeStyle={activeStyle}
                  className="nav-link"
                >
                  Login
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/UserRegistrationForm"
                  activeStyle={activeStyle}
                  className="nav-link"
                >
                  User Registration
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/AccountRecovery"
                  activeStyle={activeStyle}
                  className="nav-link"
                >
                  Account Recovery
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
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
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarColor01"
            style={{}}
          >
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
              {login.type === "Administrator" ? (
                <>
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
                </>
              ) : (
                <></>
              )}

              {login.type !== "Attendee" ? (
                <>
                  <li className="navbar-item">
                    <NavLink
                      to="/BBQRegistrationForm"
                      activeStyle={activeStyle}
                      className="nav-link"
                    >
                      BBQ Registration
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
                </>
              ) : (
                <></>
              )}

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
            <div className="text-left text-lg-right">
              <ul className="navbar-nav mr-auto navbar-right">
                <li className="navbar-item">
                  <NavLink
                    to="/Logout"
                    activeStyle={activeStyle}
                    className="nav-link"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
