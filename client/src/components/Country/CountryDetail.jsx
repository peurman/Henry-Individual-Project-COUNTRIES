import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// acciones que voy a usar:
import { getCountryDetail, emptyState } from "../../redux/actions";
import "../../styles/CountryDetail.modules.css";

const CountryDetail = (props) => {
  const { id } = useParams(); // -> me traigo ID x params
  let countryDet = useSelector((state) => state.countryDetail); // info del estado global
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCountryDetail(id)); // -> llena "countryDetail" del estado global
    return () => dispatch({ type: "EMPTY_STATE" }); //????????????{ type: "EMPTY_STATE"} emptyState()
  }, [dispatch, id]); // -> dependencia en dispatch para evitar repecitiones, y cada vez q actualiza ID

  return (
    <div className="visual">
      <div className="detailsSpace">
        <div className="detailsContainer">
          <div className="info" style={{ zIndex: "9999" }}>
            <div className="headerInfo">
              <span id="titleCountry">{countryDet.name}</span>
            </div>
            <hr />
            <br />
            <div>
              <img className="flag" alt="img" src={`${countryDet.flag}`} />
            </div>
            <br />
            <div className="fetching">
              <span>Code: {countryDet.id}</span>
            </div>
            <div className="fetching">
              <span>Capital: {countryDet.capital}</span>
            </div>
            <div className="fetching">
              <span>Location: {countryDet.subregion}</span>
            </div>
            <div className="fetching">
              <span>Continent: {countryDet.continent}</span>
            </div>
            <div className="fetching">
              <span>Area: {countryDet.area} km2 </span>
            </div>
            <div className="fetching">
              <span>Population: {countryDet.population}</span>
            </div>
            <br />
            <span id="titleMap">MAPA</span>
            <hr />
            <div>
              {/* <iframe
                title={countryDet.id}
                width="80%"
                height="150"
                style={{ border: "0", marginTop: "10px", borderRadius: "10px" }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC36GHRjga4WoOy0LsfWII_QhSJb2DQWRk&q=${countryDet.name}`}
              ></iframe> */}
            </div>
            <div className="bottomDetail">
              <div className="activities">
                <br />
                <span id="titleActivities">Activities</span>
                <br />
                <span className="reff">
                  (Refference of Difficulties: 1-Easy, 2-Upper easy, 3-Medium,
                  4-Hard, 5-Pro)
                </span>
                <hr />
                <div className="listActivities">
                  {countryDet.activities?.length > 0 ? (
                    countryDet.activities.map((a) => (
                      <div key={a.id} style={{ padding: "15px" }}>
                        <span id="activity">{a.name}</span>
                        <br />
                        Duration: <span>{a.duration} hs</span>
                        <br />
                        Difficulty: <span>{a.difficulty} </span>
                        <br />
                        Season: <span>{a.season} </span>
                        <br />
                        <br />
                      </div>
                    ))
                  ) : (
                    <span>No activites were created </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
