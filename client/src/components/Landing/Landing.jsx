import React from "react";
import { NavLink } from "react-router-dom";
// estilos:
import "../../styles/Landing.css";

const Landing = () => {
  return (
    <div className="wallpaper">
      <div className="landing">
        <h1>WELCOME TO COUNTRIES WEB!</h1>
        <p className="text">
          ... please click the button 'GO' to enter ...
          <br />
          <NavLink to="/home">
            <button className="buttonGo"> GO</button>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Landing;
