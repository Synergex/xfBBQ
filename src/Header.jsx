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
        // Not logged in
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
                  User&nbsp;Registration
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/AccountRecovery"
                  activeStyle={activeStyle}
                  className="nav-link"
                >
                  Account&nbsp;Recovery
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      ) : (
        // Logged in
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
              {login.Type === 1 ? (
                // Only admins can access user maintenance
                <>
                  <li className="navbar-item">
                    <NavLink
                      to="/UserRegistrationForm"
                      activeStyle={activeStyle}
                      className="nav-link"
                    >
                      New&nbsp;User&nbsp;Registration
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

              {login.Type !== 3 ? (
                // Attendees can't access BBQ maintenance or see shopping cart
                <>
                  <li className="navbar-item">
                    <NavLink
                      to="/BBQRegistrationForm"
                      activeStyle={activeStyle}
                      className="nav-link"
                    >
                      BBQ&nbsp;Registration
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
                      to="/ShoppingList"
                      activeStyle={activeStyle}
                      className="nav-link"
                    >
                      Shopping&nbsp;List
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
                  Place&nbsp;an&nbsp;Order
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/OrderHistory"
                  activeStyle={activeStyle}
                  className="nav-link"
                >
                  Order&nbsp;History
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
