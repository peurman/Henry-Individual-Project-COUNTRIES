import React from "react";
import { NavLink } from "react-router-dom";

import "../../styles/Nav.css";

export default function SearchBar() {
  return (
    <div className="searchBar">
      <NavLink to="/" className="menuSearchBar">
        Restart
      </NavLink>
      <NavLink to="/home" className="menuSearchBar">
        Home
      </NavLink>
      <NavLink to="/activities" className="menuSearchBar">
        Create Activity
      </NavLink>
      <NavLink to="/about" className="menuSearchBar">
        About
      </NavLink>
    </div>
  );
}
