import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// acciones a usar:
import {
  getAllCountries,
  getCountryxSearch,
  getCountriesxFilter,
  getAllActivities,
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
  // LOCAL
  const [currentPage, setCurrentPage] = useState(1); // -> para el paginado, arranco en 1
  const [countriesPerPage] = useState(10); // -> para el paginado, defino 10 x pag o el NRO que quiera

  const [switcher, setSwitcher] = useState("false"); // -> para el ordenamiento > NO FUNCIONA
  const [nameFiltered, setName] = useState(""); // -> para el filtrado x NOMBRE

  const [countryList, setCountryList] = useState(totalCountries);

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
    dispatch(getAllCountries()); // -> me traigo todos los países
    dispatch(getAllActivities()); // -> me traigo todas las actividades
  }, [dispatch]); // -> dependencia en dispatch para evitar repecitiones

  // Metodo para ORDENAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NO FUNCIONA!!!!
  function ordering() {
    if (switcher === "AZ") {
      totalCountries.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    if (switcher === "ZA") {
      totalCountries.sort(function (b, a) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    if (switcher === "popUP") {
      totalCountries.sort(function (a, b) {
        return a.population - b.population;
      });
    }
    if (switcher === "popDOWN") {
      totalCountries.sort(function (a, b) {
        return b.population - a.population;
      });
    }
    setCountryList(totalCountries);
  }
  // DETECTAR CAMBIOS
  useEffect(() => {}, [switcher, countryList]); // -> NO FUNCIONA!!!

  // FILTRO POR NOMBRE
  function handleInputChange(e) {
    setName(e.target.value); // -> guardo cada cambio en estado local
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!nameFiltered) {
      alert("You have to write somethig to do the search");
    }
    setCurrentPage(1);
    dispatch(getCountryxSearch(nameFiltered)); // -> llena "countryDetail" del estado global
    setName(""); // -> borro el estado luego al disparar la busqueda
  }

  // FILTRO POR CONTINENTE
  function handleFilterxContinent(e) {
    setCurrentPage(1);
    dispatch(getCountriesxFilter(e.target.value)); // -> llena "countryDetail" del estado global
  }

  // FILTRO POR ACTIVIDAD
  function handlexActivity(e) {
    // dispatch(countryByActivity(e.target.value));
    // setCurrentPage(1);
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
            onChange={(e) => {
              setSwitcher(e.target.value);
              ordering();
            }}
          >
            <option>Alfabetically</option>
            <option value="AZ">A - Z</option>
            <option value="ZA">Z - A</option>
          </select>
        </span>
        <span>
          <select
            className="filter"
            onChange={(e) => {
              setSwitcher(e.target.value);
              ordering();
            }}
          >
            <option>Population</option>
            <option value="popUP">Ascendant</option>
            <option value="popDOWN">Descendant</option>
          </select>
        </span>
        <span>
          <select
            className="filter"
            onChange={(e) => handleFilterxContinent(e)}
          >
            <option>Continent</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </span>
        <span>
          <select className="filter" onChange={(e) => handlexActivity(e)}>
            <option value={"All"}>Activity</option>
            {/* {(act) => (
              <option key={act} value={act}>
                {act}
              </option>
            )} */}
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
