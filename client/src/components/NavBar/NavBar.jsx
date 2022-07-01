import React from "react";
import { NavLink } from "react-router-dom";

import "../../styles/Nav.css";

export default function SearchBar() {
  return (
    <div className="nav">
      <NavLink to="/home" className="menu">
        Home
      </NavLink>
      <NavLink to="/activities" className="menu">
        Create Activity
      </NavLink>
      <NavLink to="/about" className="menu">
        About
      </NavLink>
    </div>
  );
}
