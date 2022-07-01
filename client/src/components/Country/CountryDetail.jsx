import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// acciones que voy a usar:
import { getCountryDetail } from "../../redux/actions";
import "../../styles/CountryDetail.css";

const CountryDetail = (props) => {
  const { id } = useParams(); // -> me traigo ID x params
  let countryDet = useSelector((state) => state.countryDetail); // info del estado global
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCountryDetail(id)); // -> llena "countryDetail" del estado global
    console.log("FILTRO PAIS DESDE COUNTRYDETAIL");
    return () => dispatch({ type: "EMPTY_STATE" }); // emptyState()
  }, [dispatch, id]); // -> dependencia en dispatch para evitar repecitiones, y cada vez q actualiza ID

  var upperName = countryDet.name?.toUpperCase(); // -> muerto el nombre en MAYUSC

  return (
    <div className="containerA1">
      <div className="containerB1">
        <div className="containerC1">
          <div className="containerD1">
            <div className="containerE1">
              <span id="countryTitle">{upperName}</span>
            </div>
            <hr />
            <div>
              <img className="flag" alt="img" src={`${countryDet.flag}`} />
            </div>
            <div className="containerCharact">
              <div className="containerCharactFirst">
                <p>Code:</p>
                <p>{countryDet.id}</p>
              </div>
              <div className="containerCharactCenter">
                <p>Capital:</p>
                <p>{countryDet.capital}</p>
              </div>
              <div className="containerCharactCenter">
                <p>Location:</p>
                <p>{countryDet.subregion}</p>
              </div>
              <div className="containerCharactCenter">
                <p>Continent:</p>
                <p>{countryDet.continent}</p>
              </div>
              <div className="containerCharactCenter">
                <p>Area:</p>
                <p>{countryDet.area} km2</p>
              </div>
              <div className="containerCharactLast">
                <p>Population:</p>
                <p>{countryDet.population} habitants</p>
              </div>
            </div>
            <div className="containerActA1">
              <div className="containerActB1">
                <p id="activityTitle">Activities</p>
                <span className="refLevels">
                  (Difficulty levels: 1- very easy / 2-easy / 3-medium /
                  4-difficult / 5-very difficult)
                </span>
                <hr />
                <div className="containerListAct">
                  {countryDet.activities?.length > 0 ? (
                    countryDet.activities.map((a) => (
                      <div className="containerListActEach" key={a.id}>
                        <p id="activityName">{a.name}</p>
                        <p>Duration: {a.duration} hs</p>
                        <p>Difficulty: {a.difficulty} </p>
                        <p>Season: {a.season} </p>
                      </div>
                    ))
                  ) : (
                    <p>No activites were created </p>
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
