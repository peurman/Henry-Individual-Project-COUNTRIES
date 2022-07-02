import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// acciones a usar:
import {
  getAllCountries,
  getCountryxSearch,
  getCountriesxFilter,
  getAllActivities,
  updateCountries,
  emptyError,
  // countryByActivity,
} from "../../redux/actions";

// Componentes a usar:
import Card from "../Card/Card";
import Pages from "../Pages/Pages";
import { Message } from "../Message/Message";

// estilos:
import "../../styles/Home.css";

// Comp HOME -> traigo TODOS los paises + FILTROS + ORDEN
export default function Home() {
  // GLOBAL
  const dispatch = useDispatch();
  const totalCountries = useSelector((state) => state.countries); // -> uso estado GLOBAL para traer los paises
  const totalActivities = useSelector((state) => state.activities); // -> uso estado GLOBAL para traer las actividades
  const errorDetected = useSelector((state) => state.error);

  // LOCAL
  const [currentPage, setCurrentPage] = useState(1); // -> para el paginado, arranco en 1
  const [countriesPerPage] = useState(10); // -> para el paginado, defino 10 x pag o el NRO que quiera

  const [switcher, setSwitcher] = useState("all"); // -> para el ordenamiento
  const [nameFiltered, setName] = useState(""); // -> para el filtrado x NOMBRE
  const [successMsg, setSuccessMsg] = React.useState("none"); // -> para POPUP de ERRORES

  // const [filteredActivity, setFilteredActivity] = useState(false);

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
  function ordering(val) {
    let eliminoWarning = switcher; // -> para sacar el WARNING de la consola
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
    console.log("ORDENO PAISES DESDE HOME");
    dispatch(updateCountries(totalCountries)); // -> actualiza estado global "countries"
  }
  // DETECTAR ERROR en el SEARCH
  useEffect(() => {
    if (errorDetected) setSuccessMsg("searchWithoutCount"); // -> mando POP UP de Error
    dispatch(emptyError()); // -> pongo en cero el error
  }, [errorDetected]);

  // FILTRO POR NOMBRE
  function handleInputChange(e) {
    setName(e.target.value); // -> guardo cada cambio en estado local
  }
  function handleSubmit(e) {
    e.preventDefault();
    //chequeo si es valido el dato a buscar
    if (nameFiltered.length === 0 || /\s/g.test(nameFiltered)) {
      return setSuccessMsg("searchWithoutLetters"); // alert("You have to write something to do the search");
    } else if (!/^[a-zA-Z&]+$/.test(nameFiltered)) {
      return setSuccessMsg("searchWithSpecChar"); // alert("No special characters allowed");
    }
    setCurrentPage(1);
    console.log("FILTRO PAISES DESDE HOME");
    dispatch(getCountryxSearch(nameFiltered)); // -> traigo todos los paises encontrados

    document.getElementById("filterCont").selectedIndex = 0; // -> Reseteo el de Continente
    updateFilter(); // -> Reseteo los 3 FILTROS
    // setName(""); // -> borro el estado luego al disparar la busqueda
  }

  //RECARGO PAISES con RELOAD
  function handleClick() {
    console.log("RECARGO PAISES con RELOAD");
    document.getElementById("filterCont").selectedIndex = 0;
    updateFilter(); // -> RESETEO LOS 4 FILTROS
    setName(""); // -> borro el estado del SEARCH
    dispatch(getAllCountries());
  }

  // FILTRO POR CONTINENTE
  function handleFilterxContinent(e) {
    setCurrentPage(1);
    console.log("FILTRO CONTINENTE DESDE HOME");
    dispatch(getCountriesxFilter(e.target.value)); // -> llena "countryDetail" del estado global
    updateFilter(); // -> RESETEO 3 FILTROS excepto CONT
    // ordering(switcher); // -> MANTENGO EL ULTIMO FILTRO???
  }

  // FILTRO POR ACTIVIDAD
  function handlexActivity(e) {
    if (totalCountries.filter((el) => el.activities.length > 0).length > 0) {
      // if (filteredActivity) {
      //   dispatch(getAllCountries()); // -> traigo todos los países para no filtrar sobre lo filtrado
      //   // setFilteredActivity(false); // -> invierto el switch
      // }
      let countriesFiltered = [];
      // OPCION 1
      // totalCountries.forEach((el) => {
      //   if (e.activities.length > 0 &&
      //     el.activities.find((a) => a.id === e.target.value))
      //     countriesFiltered.push(el); });
      // OPCION 2
      countriesFiltered = totalCountries.filter((c) =>
        c.activities.find((a) => a.id === e.target.value)
      );

      if (countriesFiltered.length > 0) {
        // setFilteredActivity(true);
        setCurrentPage(1);
        dispatch(updateCountries(countriesFiltered));
      } else setSuccessMsg("activityNotFound");
      //  return alert("This activity is not found in the actual selection of countries");
    } else setSuccessMsg("countriesWithoutAct");
    // return alert(
    //   "The countries currently selected do not have any activities"
    // );
  }
  //reseteo ambos filtros
  function updateFilter() {
    document.getElementById("filterAZ").selectedIndex = 0;
    document.getElementById("filterPop").selectedIndex = 0;
    document.getElementById("filterAct").selectedIndex = 0;
  }

  return (
    <div className="wallpaperHome">
      {/* <NavBar /> */}
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
              Filer by Continent...
            </option>
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
            className="filterHome"
            onChange={(e) => handlexActivity(e)}
          >
            <option value="0" hidden>
              Filer by Activity...
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
                paginate(currentPage - 1);
              }}
            >
              <span id="pagPrevNext">PREV</span>
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
      <Message // -> Renderizo Comp Message mandando "true"
        onClose={() => setSuccessMsg("none")}
        show={successMsg}
      />
    </div>
  );
}
