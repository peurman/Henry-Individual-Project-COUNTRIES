import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// acciones que voy a usar:
import { getCountryDetail } from "../../redux/actions";
import "../../styles/CountryDetail.css";
import Loading from "../Loading/Loading";

const CountryDetail = (props) => {
  const { id } = useParams();
  let countryDet = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCountryDetail(id));
    return () => dispatch({ type: "EMPTY_STATE" });
  }, [dispatch, id]);

  var upperName = countryDet.name?.toUpperCase();
  function goBack() {
    window.history.back();
  }
  return (
    <div>
      {countryDet.flag ? (
        <div className="containerA1">
          <div className="containerB1">
            <div className="containerC1">
              <div className="containerD1">
                <div className="containerE1">
                  <span id="countryTitle">{upperName}</span>
                </div>
                <div className="containerF1">
                  <div>
                    <img
                      className="flag"
                      alt="img"
                      src={`${countryDet.flag}`}
                    />
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
                      <p>
                        {new Intl.NumberFormat().format(countryDet.area)} km2
                      </p>
                    </div>
                    <div className="containerCharactLast">
                      <p>Population:</p>
                      <p>
                        {new Intl.NumberFormat().format(countryDet.population)}{" "}
                        inhabitants
                      </p>
                    </div>
                  </div>
                </div>
                <div className="containerActA1">
                  <div className="containerActB1">
                    <div className="containerActC1">
                      <p id="activityTitle">Activities</p>
                      <span className="refLevels">
                        (Difficulty levels: 1- very easy / 2-easy / 3-medium /
                        4-difficult / 5-very difficult)
                      </span>
                    </div>
                    <div className="containerListAct">
                      {countryDet.activities?.length > 0 ? (
                        countryDet.activities.map((a) => (
                          <div className="containerListActEach" key={a.id}>
                            <p id="activityName">{a.name.toUpperCase()}</p>
                            <div className="containerActivity">
                              <div className="containerActivityFirst">
                                <p>Duration:</p>
                                <p>{a.duration} hs</p>
                              </div>
                              <div className="containerActivityCenter">
                                <p>Difficulty:</p>
                                <p>{a.difficulty}</p>
                              </div>
                              <div className="containerActivityLast">
                                <p>Season:</p>
                                <p>{a.season}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="noActivities">
                          No activites were created
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="backButton">
                  <button className="button" onClick={goBack}>
                    BACK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CountryDetail;
