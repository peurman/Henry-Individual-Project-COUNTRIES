import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>WELCOME TO COUNTRIES WEB!</h1>
      <NavLink exact to="/home">
        <div>
          <button>GO</button>
        </div>
      </NavLink>
    </div>
  );
};

export default Landing;
