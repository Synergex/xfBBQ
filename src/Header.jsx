import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#5bffd5" };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink to="/" exact className="navbar-brand">
        <i>xf</i>BBQ
      </NavLink>
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item"></li>
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
            to="/OrderHistory"
            activeStyle={activeStyle}
            className="nav-link"
          >
            Order History
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
