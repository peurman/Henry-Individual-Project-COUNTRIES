import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
// modelos a usar:
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import CountryDetail from "../Country/CountryDetail";
// import About from "../About/About";
import CreateActivity from "../Activity/CreateActivity";
import "../../styles/Card.module.css";

// Comp PREVIOUS -> fija NAVBAR + RUTEO
export default class Previous extends Component {
  render() {
    return (
      <div className="App">
        <div className="base">
          <NavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<CountryDetail />} />
            <Route path="/activities" element={<CreateActivity />} />
            {/* <Route path="/about" element={<About />} />; */}
          </Routes>
        </div>
      </div>
    );
  }
}
