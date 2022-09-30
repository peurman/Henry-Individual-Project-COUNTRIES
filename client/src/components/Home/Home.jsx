import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCountries,
  getCountryxSearch,
  getCountriesxFilter,
  getAllActivities,
  updateCountries,
  emptyError,
} from "../../redux/actions";

import Card from "../Card/Card";
import Pages from "../Pages/Pages";
import Message from "../Message/Message";
import Loading from "../Loading/Loading";

import "../../styles/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const totalCountries = useSelector((state) => state.countries);
  const countriesBUP = useSelector((state) => state.countriesBackUp);
  const totalActivities = useSelector((state) => state.activities);
  const errorDetected = useSelector((state) => state.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesxPage] = useState(10);

  const [switcher, setSwitcher] = useState("all");
  const [nameFiltered, setNameFiltered] = useState("");
  const [contSelected, setContSelected] = useState("");
  const [switcherSearch, setSwitcherSearch] = useState(false);
  const [filteredActivity, setFilteredActivity] = useState(false);
  const [successMsg, setSuccessMsg] = React.useState("none");

  const indexOfLastCountry =
    currentPage === 1 ? 9 : currentPage * countriesxPage - 1;
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesxPage;
  const currentCountries = totalCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  function paginating(pageNumb) {
    setCurrentPage(pageNumb);
  }

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
  }, [dispatch]);

  function handleClick() {
    document.getElementById("filterCont").selectedIndex = 0;
    updateFilter();
    setNameFiltered("");
    setContSelected("");
    setSwitcher("all");
    setSwitcherSearch(false);
    setFilteredActivity(false);
    dispatch(getAllCountries());
  }

  function ordering(val) {
    let eliminoWarning = switcher;
    if (eliminoWarning) {
    }
    if (val === "AZ") {
      totalCountries.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      document.getElementById("filterPop").selectedIndex = 0;
    }
    if (val === "ZA") {
      totalCountries.sort(function (b, a) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      document.getElementById("filterPop").selectedIndex = 0;
    }
    if (val === "popUP") {
      totalCountries.sort(function (a, b) {
        return a.population - b.population;
      });
      document.getElementById("filterAZ").selectedIndex = 0;
    }
    if (val === "popDOWN") {
      totalCountries.sort(function (a, b) {
        return b.population - a.population;
      });
      document.getElementById("filterAZ").selectedIndex = 0;
    }
    setSwitcher(val);
    setCurrentPage(1);
    dispatch(updateCountries(totalCountries)); // -> actualiza estado global "countries"
  }

  useEffect(() => {
    if (errorDetected === 1) {
      setSuccessMsg("searchWithoutCount");
      setNameFiltered("");
    }
    if (errorDetected === 2) {
      document.getElementById("filterCont").selectedIndex = "All";
      setSuccessMsg("noCountriesInCont");
    }
    dispatch(emptyError());
  }, [errorDetected, dispatch]);

  function handleInputChange(e) {
    setNameFiltered(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (nameFiltered.length === 0) {
      return setSuccessMsg("searchWithoutLetters");
    } else if (/\s/g.test(nameFiltered)) {
      setNameFiltered("");
      return setSuccessMsg("searchWithSpaces");
    } else if (!/^[a-zA-Z&]+$/.test(nameFiltered)) {
      return setSuccessMsg("searchWithSpecChar");
    }
    setCurrentPage(1);

    if (contSelected) {
      if (contSelected === "All") {
        dispatch(getCountryxSearch("", nameFiltered));
      } else dispatch(getCountryxSearch(contSelected, nameFiltered));
    } else dispatch(getCountryxSearch("", nameFiltered));

    updateFilter();
    setSwitcher("all");
    setSwitcherSearch(true);
  }

  function handleFilterxContinent(e) {
    setCurrentPage(1);
    if (switcherSearch) {
      if (e.target.value === "All") {
        dispatch(getCountriesxFilter("", nameFiltered));
      } else dispatch(getCountriesxFilter(e.target.value, nameFiltered));
    } else {
      if (e.target.value === "All") {
        dispatch(getCountriesxFilter("", ""));
      } else dispatch(getCountriesxFilter(e.target.value, ""));
    }

    setContSelected(e.target.value);
    updateFilter();
  }

  function handlexActivity(e) {
    if (switcherSearch || filteredActivity) {
      dispatch(updateCountries(countriesBUP));
    }
    if (totalCountries.filter((el) => el.activities.length > 0).length > 0) {
      let countriesFiltered = [];
      countriesFiltered = countriesBUP.filter((c) =>
        c.activities.find((a) => a.id === e.target.value)
      );
      if (countriesFiltered.length > 0) {
        setFilteredActivity(true);
        setCurrentPage(1);
        dispatch(updateCountries(countriesFiltered));
      } else {
        setSuccessMsg("activityNotFound");
        document.getElementById("filterAct").selectedIndex = 0;
        document.getElementById("filterAZ").selectedIndex = 0;
        document.getElementById("filterPop").selectedIndex = 0;
        if (!contSelected)
          document.getElementById("filterCont").selectedIndex = 0;
      }
    } else {
      setSuccessMsg("countriesWithoutAct");
      document.getElementById("filterAct").selectedIndex = 0;
    }
  }

  function updateFilter() {
    document.getElementById("filterAZ").selectedIndex = 0;
    document.getElementById("filterPop").selectedIndex = 0;
    document.getElementById("filterAct").selectedIndex = 0;
  }

  return (
    <div className="home">
      {totalCountries.length > 0 ? (
        <div className="wallpaperHome">
          <div className="consola">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input"
                placeholder="Search a country..."
                value={nameFiltered}
                onChange={handleInputChange}
              />
              <input className="search" type="submit" value="Search" />
            </form>
            <span>
              <select
                className="filterHome"
                id="filterAZ"
                onChange={(e) => {
                  ordering(e.target.value);
                }}
              >
                <option value="1" hidden>
                  Order Alfabetically...
                </option>
                <option value="AZ">A - Z</option>
                <option value="ZA">Z - A</option>
              </select>
            </span>
            <span>
              <select
                className="filterHome"
                id="filterPop"
                onChange={(e) => {
                  ordering(e.target.value);
                }}
              >
                <option value="0" hidden>
                  Order by Population...
                </option>
                <option value="popUP">Ascendant</option>
                <option value="popDOWN">Descendant</option>
              </select>
            </span>
            <span>
              <select
                id="filterCont"
                className="filterHome"
                onChange={(e) => {
                  handleFilterxContinent(e);
                }}
              >
                <option value="" hidden>
                  Filter by Continent...
                </option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Antarctic">Antarctic</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="All">ALL</option>
              </select>
            </span>
            <span>
              <select
                id="filterAct"
                className="filterHome"
                onChange={(e) => handlexActivity(e)}
              >
                <option value="0" hidden>
                  Filter by Activity...
                </option>
                {totalActivities?.map((curr) => {
                  return (
                    <option key={curr.id} value={curr.id}>
                      {curr.name}
                    </option>
                  );
                })}
              </select>
            </span>
            <span>
              <button className="button" onClick={handleClick}>
                RELOAD Countries
              </button>
            </span>
          </div>
          <div className="paginatorSpace">
            <div className="paginatorContainer">
              <div className="paginatorBorder">
                <button
                  disabled={currentPage === 1 ? true : false}
                  onClick={() => {
                    paginating(currentPage - 1);
                  }}
                >
                  <span id="pagPrevNext">PREV</span>
                </button>
                <Pages
                  countriesxPage={countriesxPage}
                  totalCountries={totalCountries.length}
                  paginating={paginating}
                  currentPage={currentPage}
                />
                <button
                  disabled={
                    currentPage ===
                    1 + Math.ceil((totalCountries.length - 9) / countriesxPage)
                      ? true
                      : false
                  }
                  onClick={() => {
                    paginating(currentPage + 1);
                  }}
                >
                  <span id="pagPrevNext">NEXT</span>
                </button>
              </div>
            </div>
          </div>
          <div className="countrySpace">
            <span className="countryContainer">
              {currentCountries?.map((curr) => {
                return (
                  <Card
                    key={curr.id}
                    id={curr.id}
                    name={curr.name}
                    flag={curr.flag}
                    continent={curr.continent}
                  />
                );
              })}
            </span>
          </div>
          <Message onClose={() => setSuccessMsg("none")} show={successMsg} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
