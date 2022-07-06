import React from "react";
import loading from "../../assests/loading.gif";

const Loading = () => {
  return (
    <div className="containerA1">
      <img
        src={loading}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading"
      />
      <p id="countryTitle">Cargando...</p>
    </div>
  );
};

export default Loading;
