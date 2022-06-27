import React from "react";
import { useEffect, useState } from "react"; // -> useEffect a quitar
import { useDispatch, useSelector } from "react-redux";

// acciones a usar:
import {
  getAllCountries,
  getCountryxSearch,
  getCountriesxFilter,
  getAllActivities,
  updateCountries, // a activar
} from "../../redux/actions";

// Componentes a usar:
import Card from "../Card/Card";
import Pages from "../Pages/Pages";
// estilos:
import "../../styles/Home.modules.css";

// Comp HOME -> traigo TODOS los paises + FILTROS + ORDEN
export default function Home() {
  // GLOBAL
  const dispatch = useDispatch();
  const totalCountries = useSelector((state) => state.countries); // -> uso estado global para traerme los paises
  const totalActivities = useSelector((state) => state.activities); // -> uso estado global para traerme las actividades
  // LOCAL
  const [currentPage, setCurrentPage] = useState(1); // -> para el paginado, arranco en 1
  const [countriesPerPage] = useState(10); // -> para el paginado, defino 10 x pag o el NRO que quiera

  const [switcher, setSwitcher] = useState("all"); // -> para el ordenamiento > NO FUNCIONA
  const [nameFiltered, setName] = useState(""); // -> para el filtrado x NOMBRE
  // const [countryList, setCountryList] = useState(totalCountries); // A SACAR

  //PAGINADO
  const indexOfLastCountry =
    currentPage === 1 ? 9 : currentPage * countriesPerPage - 1; // -> indexEnd inicial set en 9, luego en Pag2 = 2*10-1=19
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage; // -> indexStart inicial set en 0, luego Pag2 = 19 - 10 = 9
  const currentCountries = totalCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); // -> me traigo de a tandas de 10 paises
  function paginate(pageNumb) {
    setCurrentPage(pageNumb); // -> seteo nuevo currentPage
  }

  // GET PAISES y GET ACTIVITIES al BACK
  useEffect(() => {
    console.log("PIDO PAISES Y ACTIVIDADES DESDE HOME");
    dispatch(getAllCountries()); // -> me traigo todos los países
    dispatch(getAllActivities()); // -> me traigo todas las actividades
  }, [dispatch]); // -> dependencia en dispatch para evitar repecitiones

  // Metodo para ORDENAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NO FUNCIONA!!!!
  function ordering(e) {
    if (e.target.value === "AZ") {
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
    if (e.target.value === "ZA") {
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
    if (e.target.value === "popUP") {
      totalCountries.sort(function (a, b) {
        return a.population - b.population;
      });
      document.getElementById("filterAZ").selectedIndex = 0;
    }
    if (e.target.value === "popDOWN") {
      totalCountries.sort(function (a, b) {
        return b.population - a.population;
      });
      document.getElementById("filterAZ").selectedIndex = 0;
    }
    setSwitcher(e.target.value);
    console.log("ORDENO PAISES DESDE HOME");
    dispatch(updateCountries(totalCountries)); // -> actualiza estado global "countries"
  }
  // DETECTAR CAMBIOS
  // useEffect(() => {}, [switcher, countryList]); // -> NO FUNCIONA!!!

  // FILTRO POR NOMBRE
  function handleInputChange(e) {
    setName(e.target.value); // -> guardo cada cambio en estado local
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!nameFiltered) {
      alert("You have to write something to do the search");
    }
    setCurrentPage(1);
    console.log("FILTRO PAISES DESDE HOME");
    dispatch(getCountryxSearch(nameFiltered)); // -> llena "countryDetail" del estado global
    setName(""); // -> borro el estado luego al disparar la busqueda
  }

  // FILTRO POR CONTINENTE
  function handleFilterxContinent(e) {
    setCurrentPage(1);
    console.log("FILTRO CONTINENTE DESDE HOME");
    updateFilter();
    dispatch(getCountriesxFilter(e.target.value)); // -> llena "countryDetail" del estado global
  }

  // FILTRO POR ACTIVIDAD
  function handlexActivity(e) {
    // dispatch(countryByActivity(e.target.value));
    // setCurrentPage(1);
  }
  //reseteo ambos filtros
  function updateFilter() {
    document.getElementById("filterAZ").selectedIndex = 0;
    document.getElementById("filterPop").selectedIndex = 0;
    document.getElementById("filterAct").selectedIndex = 0;
  }

  return (
    <>
      <div className="consola">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Write a country to search..."
            value={nameFiltered}
            onChange={handleInputChange}
          />
          <input className="search" type="submit" value="Search" />
        </form>
        <span>
          <select
            className="filter"
            id="filterAZ"
            onChange={(e) => {
              ordering(e);
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
            className="filter"
            id="filterPop"
            onChange={(e) => {
              ordering(e);
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
            className="filter"
            onChange={(e) => {
              handleFilterxContinent(e);
            }}
          >
            <option hidden>Filer by Continent...</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </span>
        <span>
          <select
            id="filterAct"
            className="filter"
            onChange={(e) => handlexActivity(e)}
          >
            <option value="0" hidden>
              Filer by Activity...
            </option>
            {totalActivities?.map((curr) => {
              return (
                <option key={curr.id} id={curr.id}>
                  {curr.name}
                </option>
              );
            })}
          </select>
        </span>
      </div>
      <div className="paginatorSpace">
        <div className="paginatorContainer">
          <button
            disabled={currentPage === 1 ? true : false}
            onClick={() => {
              paginate(currentPage - 1);
            }}
          >
            <span id="pag">PREV</span>
          </button>
          <Pages
            countriesPerPage={countriesPerPage}
            totalCountries={totalCountries.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <button
            disabled={
              currentPage ===
              1 + Math.ceil((totalCountries.length - 9) / countriesPerPage)
                ? true
                : false
            }
            display="none" //visibility={if(currentPage ===Math.ceil(totalCountries.length / countriesPerPage)) "hidden "}
            onClick={() => {
              paginate(currentPage + 1);
            }}
          >
            <span id="pag">NEXT</span>
          </button>
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
    </>
  );
}
