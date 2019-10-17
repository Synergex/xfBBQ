import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#EA6153" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/CurrentOrder" activeStyle={activeStyle}>
        Current Order
      </NavLink>
      {" | "}
      <NavLink to="/OrderHistory" activeStyle={activeStyle}>
        Order History
      </NavLink>
    </nav>
  );
};

export default Header;
