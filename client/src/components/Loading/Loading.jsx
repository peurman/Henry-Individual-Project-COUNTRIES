import React from "react";
import loading from "../../assests/loading.gif";
import "../../styles/Loading.css";

const Loading = () => {
  return (
    <div className="containerA1">
      <div className="containerLoading">
        <p id="activityTitle">Loading...</p>
        <img src={loading} alt="Loading" />
      </div>
    </div>
  );
};

export default Loading;
