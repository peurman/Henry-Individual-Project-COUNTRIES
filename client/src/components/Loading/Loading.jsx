import React from "react";
import loading from "../../assests/loading.gif";
import "../../styles/Loading.css";

const Loading = () => {
  return (
    <div className="containerA1">
      <div className="containerLoading">
        <img
          src={loading}
          style={{ width: "200px", margin: "auto", display: "block" }}
          alt="Loading"
        />
        <p id="activityTitle">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
