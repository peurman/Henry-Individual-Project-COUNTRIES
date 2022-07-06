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
import Message from "../Message/Message";
import Loading from "../Loading/Loading";

// estilos:
import "../../styles/Home.css";

// Comp HOME -> cargo PAISES + FILTROS + ORDEN
export default function Home() {
  // GLOBAL
  const dispatch = useDispatch();
  const totalCountries = useSelector((state) => state.countries); // -> uso estado GLOBAL para traer los paises
  const countriesBUP = useSelector((state) => state.countriesBackUp); // -> uso estado GLOBAL para reutilizar busqueda
  const totalActivities = useSelector((state) => state.activities); // -> uso estado GLOBAL para traer las actividades
  const errorDetected = useSelector((state) => state.error);

  // LOCAL
  const [currentPage, setCurrentPage] = useState(1); // -> para el paginado, arranco en 1
  const [countriesxPage] = useState(10); // -> para el paginado, defino 10 x pag o el NRO que quiera

  const [switcher, setSwitcher] = useState("all"); // -> para el ordenamiento
  const [nameFiltered, setNameFiltered] = useState(""); // -> para el filtrado x NOMBRE
  const [contSelected, setContSelected] = useState(""); // -> para el filtrado x CONTINENTE
  // const [contSelectedPrev, setContSelectedPrev] = useState(""); // -> NO LA USO
  const [switcherSearch, setSwitcherSearch] = useState(false); // -> para el SEARCH
  const [filteredActivity, setFilteredActivity] = useState(false); // -> para el re filtrado
  const [successMsg, setSuccessMsg] = React.useState("none"); // -> para POPUP de ERRORES

  //PAGINADO ======================================================
  const indexOfLastCountry =
    currentPage === 1 ? 9 : currentPage * countriesxPage - 1; // -> indexEnd inicial set en 9, luego en Pag2 = 2*10-1=19
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesxPage; // -> indexStart inicial set en 0, luego Pag2 = 19 - 10 = 9
  const currentCountries = totalCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); // -> TANDAS de 10 paises, las CARDS que luego RENDERIZO
  function paginating(pageNumb) {
    setCurrentPage(pageNumb); // -> seteo nuevo currentPage en ESTADO LOCAL
  }

  // GET PAISES y GET ACTIVITIES al BACK =========================================
  useEffect(() => {
    console.log("PIDO PAISES Y ACTIVIDADES DESDE HOME");
    dispatch(getAllCountries()); // -> GET traigo todos los países
    dispatch(getAllActivities()); // -> GET traigo todas las actividades
  }, [dispatch]); // -> dependencia en dispatch para evitar repecitiones

  // RECARGO PAISES con RELOAD =========================================
  function handleClick() {
    console.log("RECARGO PAISES con RELOAD");
    document.getElementById("filterCont").selectedIndex = 0;
    updateFilter(); // -> RESETEO LOS 4 FILTROS
    setNameFiltered(""); // -> borro el ESTADO LOCAL del SEARCH
    setContSelected(""); // -> borro el ESTADO LOCAL del CONT
    setSwitcher("all");
    setSwitcherSearch(false); // -> apago switch y aviso que se hizo una busqueda
    setFilteredActivity(false); // -> para reinicer filtrado
    dispatch(getAllCountries()); // -> GET traigo todos los países
  }
  // ORDENAMIENTO -> función =====================================================
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
    setCurrentPage(1); // -> ordeno y vuelvo a página 1
    console.log("ORDENO PAISES DESDE HOME");
    dispatch(updateCountries(totalCountries)); // -> actualiza estado global "countries"
  }

  // DETECTAR ERROR en SEARCH o CONT para PopUp ==================================
  useEffect(() => {
    if (errorDetected === 1) {
      setSuccessMsg("searchWithoutCount"); // -> mando POPUP de Error Search
      setNameFiltered(""); // -> borro buscador
      // dispatch(getAllCountries()); // -> GET recargo todos los países
    }
    if (errorDetected === 2) {
      document.getElementById("filterCont").selectedIndex = "All"; // -> reseteo filtro Cont
      setSuccessMsg("noCountriesInCont"); // -> mando POPUP de Error Cont
    }
    dispatch(emptyError()); // -> pongo en cero el error
  }, [errorDetected, dispatch]);

  // SEARCH POR NOMBRE ====================================================
  function handleInputChange(e) {
    setNameFiltered(e.target.value); // -> guardo cada cambio en ESTADO LOCAL
  }
  function handleSubmit(e) {
    e.preventDefault();
    //chequeo si es valido el dato a buscar
    if (nameFiltered.length === 0) {
      return setSuccessMsg("searchWithoutLetters"); // alert("You have to write something to do the search");
    } else if (/\s/g.test(nameFiltered)) {
      setNameFiltered("");
      return setSuccessMsg("searchWithSpaces"); // alert("Spaces ar not allowed");
    } else if (!/^[a-zA-Z&]+$/.test(nameFiltered)) {
      return setSuccessMsg("searchWithSpecChar"); // alert("No special characters allowed");
    }
    setCurrentPage(1);
    console.log("FILTRO PAISES DESDE HOME");
    //Hubo ya un CONTINENTE filtrado??
    if (contSelected) {
      if (contSelected === "All") {
        dispatch(getCountryxSearch("", nameFiltered)); // -> GET filtro sólo con NAME del Search
      } else dispatch(getCountryxSearch(contSelected, nameFiltered)); // -> GET Filtro con CONTINENT +NAME
    } else dispatch(getCountryxSearch("", nameFiltered)); // -> GET filtro sólo con NAME del Search

    updateFilter(); // -> Reseteo los 3 FILTROS
    setSwitcher("all"); // -> Reseteo ordenamiento
    setSwitcherSearch(true); // -> enciendo switch y aviso que se hizo una busqueda
    // document.getElementById("filterCont").selectedIndex = 0; // -> Reseteo el de Continente
    // setNameFiltered(""); // -> borro el estado luego al disparar la busqueda
  }

  // FILTRO POR CONTINENTE ==============================================
  function handleFilterxContinent(e) {
    setCurrentPage(1);
    console.log("FILTRO CONTINENTE DESDE HOME");
    //Hubo ya una BUSQUEDA??
    if (switcherSearch) {
      if (e.target.value === "All") {
        dispatch(getCountriesxFilter("", nameFiltered)); // -> ESTADO GLOBAL "countries" completo, sin filtros
      } else dispatch(getCountriesxFilter(e.target.value, nameFiltered)); // -> ESTADO GLOBAL "countries" con CONT+NAME
    } else {
      if (e.target.value === "All") {
        dispatch(getCountriesxFilter("", "")); // -> ESTADO GLOBAL "countries" completo, sin filtros
      } else dispatch(getCountriesxFilter(e.target.value, "")); // -> ESTADO GLOBAL "countries" solo con CONT
    }
    // setContSelectedPrev(contSelected);
    setContSelected(e.target.value);
    updateFilter(); // -> Reseteo 3 FILTROS, excepto CONTINENTE
    // ordering(switcher); // -> MANTENGO EL ULTIMO FILTRO???
  }

  // FILTRO POR ACTIVIDAD ==================================================
  function handlexActivity(e) {
    console.log("ANTES DE HACER NADA, LA ACTIVIDAD", e.target.value);
    if (switcherSearch || filteredActivity) {
      console.log("ANTES DE FILTRAR X ACTIV, CARGO DE NUEVO PAISES DEL SEARCH");
      dispatch(updateCountries(countriesBUP)); // -> si ya habia busq, traigo el backup
    }
    if (totalCountries.filter((el) => el.activities.length > 0).length > 0) {
      let countriesFiltered = [];
      console.log("JUSTO ANTES DE FILTRAR, LA ACTIVIDAD ES", e.target.value);
      countriesFiltered = countriesBUP.filter(
        (c) => c.activities.find((a) => a.id === e.target.value) // -> hago el filtro direct. sobre el backup
      );
      console.log("PAISES FILTRADOS:", countriesFiltered);
      if (countriesFiltered.length > 0) {
        setFilteredActivity(true); // -> activo switch para avisar que YA hubo filtrado
        setCurrentPage(1);
        dispatch(updateCountries(countriesFiltered)); // -> ACTUALIZO COUNTRIES con los paises filtrados
        // document.getElementById("filterAct").selectedIndex = 0; // -> reseteo filtro
      } else {
        setSuccessMsg("activityNotFound"); // -> POPUP: la actividad NO ESTA en esa seleccion de paises
        document.getElementById("filterAct").selectedIndex = 0; // -> reseteo filtro
        document.getElementById("filterAZ").selectedIndex = 0;
        document.getElementById("filterPop").selectedIndex = 0;
        if (!contSelected)
          document.getElementById("filterCont").selectedIndex = 0;
      }
    } else {
      setSuccessMsg("countriesWithoutAct"); // -> POPUP: los países no tienen NINGUNA ACTIVIDAD
      document.getElementById("filterAct").selectedIndex = 0; // -> reseteo filtro
    }
  }

  // RESETEO 3 FILTROS =====================================
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
                  // visibility={currentPage === 1 ? "hidden" : "visible"}
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
                  // display="none"
                  // visibility={
                  //   currentPage ===
                  //   1 + Math.ceil((totalCountries.length - 9) / countriesxPage)
                  //     ? "hidden"
                  //     : "visible" }
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
