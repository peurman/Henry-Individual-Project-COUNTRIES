import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries, createActivity } from "../../redux/actions";
import "../../styles/CreateActivity.css";

// componente CREATE ACTIVITY
export default function CreateActivity() {
  const dispatch = useDispatch();

  const totalCountries = useSelector((state) => state.countries); // -> uso estado GLOBAL para traer los paises

  const [errors, setErrors] = React.useState({}); // -> uso estado LOCAL para almacenar errores
  const [countriesSelected, setCountriesSelected] = React.useState([]);
  const [switcher, setSwitcher] = React.useState(""); // -> para la validación

  // estado LOCAL con todo el FORMULARIO
  let [myForm, setMyForm] = React.useState({
    // -> uso estado local
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countryId: [],
  });

  // GET PAISES y GET ACTIVITIES al BACK
  useEffect(() => {
    console.log("PIDO PAISES Y ACTIVIDADES DESDE CREATE ACTIVITY");
    dispatch(getAllCountries()); // -> me traigo todos los países
  }, [dispatch]); // -> dependencia en dispatch para evitar repecitiones

  // FUNCION para VALIDAR NOMBRE y DURACION
  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "The name of the activity is required";
    } else if (!/^[a-zA-Z0-9& áéíóú]+$/.test(input.name)) {
      errors.name =
        "Activity name is invalid, no special characters are allowed"; // -> "/[$%&|<>#]/" valida caracteres especiales
    }

    if (!input.duration) {
      errors.duration = "Duration is required";
    } else if (!/^([1-9][0-9]+|[1-9])/.test(input.duration)) {
      errors.duration = "Duration must be a number between 1 and 24"; // -> "/^\d+$/" RegExp oara validar nros positivos
    } else if (input.duration > 24 || input.duration === 0) {
      errors.duration = "Duration must be between 1 and 24";
    }

    if (!input.difficulty) {
      errors.difficulty = "Difficulty is required, please choose one option";
    }

    if (!input.season) {
      errors.season = "Season is required, please choose one option";
    }

    if (input.countryId.length < 1) {
      errors.countryId =
        "At least one country is required, please choose from the list";
    }

    return errors;
  }

  // ORDENO los paises para mostrarlos en listado
  let ordered = totalCountries.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  // con CADA CAMBIO seteo la prop del FORM y del ERROR
  let handleChange = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value, // -> voy seteando cada valor
    });
    setErrors(
      validate({
        ...myForm,
        [e.target.name]: e.target.value,
      })
    );
  };

  // Agreo PAIS al arreglo countriesSelected
  let handleChangeCountry = (e) => {
    let selected = totalCountries.find((c) => c.name === e.target.value); // -> pais seleccionado
    let list = [...myForm.countryId, selected.id]; // -> agrego id del pais seleccionad
    setErrors(
      validate({
        ...myForm,
        countryId: list, // -> actualizo lista en el error
      })
    );
    setMyForm({
      ...myForm,
      countryId: list, // -> actualizo listado de ID de paises
    });
    setCountriesSelected((elements) => [...elements, selected]); // -> agrego al array paises elegido
  };

  // elimino BANDERA y NOMBRE de algun pais elegido
  function OnCloseFlag(id) {
    let depurated = countriesSelected.filter((c) => c.id !== id);
    let depuratedIds = myForm.countryId.filter((el) => el !== id);
    setMyForm({
      ...myForm,
      countryId: depuratedIds, // -> agrego al array el ID del pais
    });
    setErrors(
      validate({
        ...myForm,
        countryId: depuratedIds, // -> actualizo lista en el error
      })
    );
    document.getElementById("countries").selectedIndex = "";
    setCountriesSelected(depurated);
  }

  // SUBMIT > solicito el POST!!
  let handleSubmit = (e) => {
    e.preventDefault(); // -> al querer salir  aviso x info cargada
    dispatch(createActivity(myForm)); /// -> con el submit hago el post
    updateFilters();
    setCountriesSelected([]);
    setMyForm({
      name: "",
      duration: "",
      difficulty: "",
      season: "",
      countryId: [],
    });
  };

  //reseteo ambos filtros
  function updateFilters() {
    // document.getElementById("nameActivity").selectedIndex = "";
    // document.getElementById("durActivity").selectedIndex = 0;
    document.getElementById("difficulty").selectedIndex = "";
    document.getElementById("season").selectedIndex = "";
    document.getElementById("countries").selectedIndex = "";
  }

  return (
    <div className="base5">
      <div className="containerA2">
        <div className="containerB2">
          <div className="containerC2">
            <div className="containerTitleA">
              <span id="createTitle">CREATE ACTIVITY</span> <hr />
            </div>
            <div className="containerCreateA">
              <div className="containerCreateB">
                <form id="formActivity" onSubmit={handleSubmit}>
                  <div className="containerSection">
                    <p className="titleInput">Name of the Activity: </p>
                    <input
                      className={!errors.name ? "inputBox" : "danger"}
                      id="nameActivity"
                      type="text"
                      placeholder="Please write a name..."
                      onChange={(e) => {
                        setSwitcher("nameActivity");
                        handleChange(e);
                      }}
                      value={myForm.name}
                      name="name"
                    />
                    <p
                      visibility={errors.name ? "visible" : "hidden"}
                      className="dangerText"
                    >
                      {errors.name}
                    </p>
                  </div>
                  <div className="containerSection">
                    <p className="titleInput">Duration in hours: </p>
                    <input
                      className={!errors.duration ? "inputBox" : "danger"}
                      id="durActivity"
                      type="text"
                      placeholder="Please write a number..."
                      onChange={(e) => {
                        setSwitcher("durActivity");
                        handleChange(e);
                      }}
                      value={myForm.duration}
                      name="duration"
                    />
                    <p
                      visibility={errors.duration ? "visible" : "hidden"}
                      className="dangerText"
                    >
                      {errors.duration}
                    </p>
                  </div>
                  <div className="containerSectionB">
                    <select
                      name="difficulty"
                      id="difficulty"
                      className={!errors.difficulty ? "filter" : "dangerFilter"}
                      onChange={(e) => {
                        setSwitcher("difficulty");
                        handleChange(e);
                      }}
                    >
                      <option hidden value="">
                        Difficulty of the activity...
                      </option>
                      <option value="1">1 - Very Easy</option>
                      <option value="2">2 - Easy</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - Difficult </option>
                      <option value="5">5 - Very Difficult</option>
                    </select>
                    <p
                      visibility={errors.difficulty ? "visible" : "hidden"}
                      className="dangerText"
                    >
                      {errors.difficulty}
                    </p>
                  </div>
                  <div className="containerSectionB">
                    <select
                      className={!errors.season ? "filter" : "dangerFilter"}
                      id="season"
                      name="season"
                      onChange={(e) => {
                        setSwitcher("season");
                        handleChange(e);
                      }}
                    >
                      <option hidden value="">
                        Season of the activity...
                      </option>
                      <option value="All the year">All the year</option>
                      <option value="Autumn">Autumn</option>
                      <option value="Summer">Summer</option>
                      <option value="Spring">Spring</option>
                      <option value="Winter">Winter</option>
                    </select>
                    <p
                      visibility={errors.season ? "visible" : "hidden"}
                      className="dangerText"
                    >
                      {errors.season}
                    </p>
                  </div>
                  <div className="containerSectionB">
                    <select
                      className={!errors.countryId ? "filter" : "dangerFilter"}
                      id="countries"
                      name="country"
                      onChange={(e) => {
                        setSwitcher("countries");
                        handleChangeCountry(e);
                      }}
                    >
                      <option hidden value="">
                        Countries to practice this activity...
                      </option>
                      {ordered &&
                        ordered.map((c) => (
                          <option
                            key={c.id}
                            value={c.name}
                            defaultValue={c.name}
                          >
                            {c.name}
                          </option>
                        ))}
                    </select>
                    <p
                      visibility={errors.countryId ? "visible" : "hidden"}
                      className="dangerText"
                    >
                      {errors.countryId}
                    </p>
                  </div>
                  <p id="titleListCountries">Countries for this activity:</p>
                  <div className="containerFlags">
                    {countriesSelected &&
                      countriesSelected.map((item) => (
                        <div key={item.id} className="flagTiny">
                          <img src={item.flag} alt="img" />
                          <button
                            type="button"
                            id="littleX"
                            onClick={() => OnCloseFlag(item.id)}
                          >
                            X
                          </button>
                          <span>{item.name}</span>
                        </div>
                      ))}
                  </div>
                  <div className="containerSubmit">
                    <div className="containerButton">
                      <button
                        type="submit"
                        disabled={
                          errors.name ||
                          errors.duration ||
                          errors.difficulty ||
                          errors.season ||
                          errors.countryId ||
                          !myForm.name ||
                          !myForm.duration ||
                          !myForm.difficulty ||
                          !myForm.season ||
                          myForm.countryId.length === 0
                        }
                        className="buttonSub"
                      >
                        Create Activity
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
