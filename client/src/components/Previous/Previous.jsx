import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
// import { connect } from "react-redux";

// modelos a usar:
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import CountryDetail from "../Country/CountryDetail";
import About from "../About/About";
import CreateActivity from "../Activity/CreateActivity";
import "../../styles/Previous.css";

// acciones a usar:
// import { getAllCountries, getAllActivities } from "../../redux/actions";

// Comp PREVIOUS -> PAISES + ACTIVIDADES + fija NAVBAR + RUTEO
export default class Previous extends Component {
  // GET PAISES y GET ACTIVITIES al BACK > CARGA INICIAL
  // componentDidMount() {
  //   console.log("PIDO PAISES Y ACTIVIDADES DESDE PREVIOUS");
  //   this.props.getAllCountries(); // -> traigo todos los países de la BD
  //   this.props.getAllActivities(); // -> traigo todas las actividades de la BD
  // }
  render() {
    return (
      <div>
        <div className="base">
          <br />
          <NavBar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/home/:id" element={<CountryDetail />} />
            <Route path="/activities" element={<CreateActivity />} />
            <Route path="/about" element={<About />} />;
          </Routes>
        </div>
      </div>
    );
  }
}

// export const mapStateToProps = (state) => {
//   return {
//     countries: state.countries,
//     activities: state.activities,
//   };
// };
// export const mapDispatchToProps = (dispatch) => {
//   return {
//     getAllCountries: () => dispatch(getAllCountries()),
//     getAllActivities: () => dispatch(getAllActivities()),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Previous);
