import React from "react";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/activities">Create Activity</NavLink>
    </div>
  );
}
