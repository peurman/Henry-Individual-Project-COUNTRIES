import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries, postNewActivity } from "../../redux/actions";
import "../../styles/CreateActivity.css";
import Message from "../Message/Message";

export default function CreateActivity() {
  const dispatch = useDispatch();

  const totalCountries = useSelector((state) => state.countries);

  const [errors, setErrors] = React.useState({});
  const [countriesSelected, setCountriesSelected] = React.useState([]);
  const [successMsg, setSuccessMsg] = React.useState("none");

  let [myForm, setMyForm] = React.useState({
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countryId: [],
  });

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  function validate(input) {
    let errors = {};

    if (!input.name || /\s/g.test(input.name)) {
      errors.name =
        "The name of the activity is required, spaces are not allowed";
    } else if (!/^[a-zA-Z0-9& áéíóú]+$/.test(input.name)) {
      errors.name =
        "Activity name is invalid, no special characters are allowed";
    }

    if (!input.duration) {
      errors.duration = "Duration is required";
    } else if (!/^([1-9][0-9]+|[1-9])/.test(input.duration)) {
      errors.duration = "Duration must be a number between 1 and 24";
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

  let ordered = totalCountries.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  let handleChange = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...myForm,
        [e.target.name]: e.target.value,
      })
    );
  };

  let handleChangeCountry = (e) => {
    let selected = totalCountries.find((c) => c.name === e.target.value);

    if (!countriesSelected.find((el) => el.id === selected.id)) {
      let list = [...myForm.countryId, selected.id];
      setErrors(
        validate({
          ...myForm,
          countryId: list,
        })
      );
      setMyForm({
        ...myForm,
        countryId: list,
      });
      setCountriesSelected((elements) => [...elements, selected]);
    } else setSuccessMsg("onlyOnce");
  };

  function OnCloseFlag(id) {
    let depurated = countriesSelected.filter((c) => c.id !== id);
    let depuratedIds = myForm.countryId.filter((el) => el !== id);
    setMyForm({
      ...myForm,
      countryId: depuratedIds,
    });
    setErrors(
      validate({
        ...myForm,
        countryId: depuratedIds,
      })
    );
    document.getElementById("countries").selectedIndex = "";
    setCountriesSelected(depurated);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewActivity(myForm));
    updateFilters();
    setCountriesSelected([]);
    setMyForm({
      name: "",
      duration: "",
      difficulty: "",
      season: "",
      countryId: [],
    });
    setSuccessMsg("createAct");
  };

  function updateFilters() {
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
              <span id="createTitle">New Activity</span>
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
                  <p id="titleListCountries">
                    Countries selected for this activity:
                  </p>
                  <div className="containerFlags">
                    {countriesSelected &&
                      countriesSelected.map((item) => (
                        <div key={item.id} className="flagTiny">
                          <button
                            type="button"
                            id="littleX"
                            onClick={() => OnCloseFlag(item.id)}
                          >
                            x
                          </button>
                          <img
                            src={item.flag}
                            alt="img"
                            className="flagTinyFlag"
                          />
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
                      <Message
                        onClose={() => setSuccessMsg("none")}
                        show={successMsg}
                      />
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
