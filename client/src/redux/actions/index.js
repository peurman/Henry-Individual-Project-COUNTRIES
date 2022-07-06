export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const GET_COUNTRY_BY_SEARCH = "GET_COUNTRY_BY_SEARCH";
export const GET_COUNTRIES_BY_FILTER = "GET_COUNTRIES_BY_FILTER";
export const POST_NEW_ACTIVITY = "POST_NEW_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const EMPTY_STATE = "EMPTY_STATE";
export const UPDATE_COUNTRIES = "UPDATE_COUNTRIES";
export const ERROR_RECEIVED_1 = "ERROR_RECEIVED_1";
export const ERROR_RECEIVED_2 = "ERROR_RECEIVED_2";
export const EMPTY_ERROR = "EMPTY_ERROR";

// export const COUNTRY_BY_ACTIVITY = "COUNTRY_BY_ACTIVITY"; // -> lo hago en Home
// export const DELETE_ACTIVITY = "DELETE_ACTIVITY"; // NO PEDIDA

const axios = require("axios"); // también uso fetch

// GET_ALL_COUNTRIES con AXIOS
export const getAllCountries = () => {
  return async function (dispatch) {
    const response = await axios.get("/countries");
    dispatch({
      type: GET_ALL_COUNTRIES,
      payload: response.data, // -> trae arreglo de objetos paises
    });
  };
};
// ↑↑↑↑↑↑↑↑ GET_ALL_COUNTRIES con FETCH
// export const getAllCountries = () => {
//   return async function (dispatch) {
//     return fetch("http://localhost:3001/countries")
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({
//           type: GET_ALL_COUNTRIES,
//           payload: json, // -> trae arreglo de objetos paises
//         });
//       });
//   };
// };

// GET_COUNTRY_DETAIL x ID con AXIOS
export const getCountryDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get("/countries/" + id);
    dispatch({
      type: GET_COUNTRY_DETAIL,
      payload: response.data, // -> trae objeto con ese país
    });
  };
};
// ↑↑↑↑↑↑↑↑ GET_COUNTRY_DETAIL con FETCH
// export const getCountryDetail = (id) => {
//   return async (dispatch) => {
//     return fetch("http://localhost:3001/countries/" + id)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({
//           type: GET_COUNTRY_DETAIL,
//           payload: json, // -> trae objeto con ese país
//         });
//       });
//   };
// };

// GET_COUNTRY_BY_SEARCH
export function getCountryxSearch(continent, name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/countries?continent=${continent}&name=${name}`
      );
      dispatch({
        type: GET_COUNTRY_BY_SEARCH,
        payload: response.data, // -> trae paises que matchean con la busqueda
      });
    } catch (error) {
      // console.log(error);
      // alert("No countries were found with the selected search");
      dispatch({
        type: ERROR_RECEIVED_1, // -> cambio el flag de la prop "error"
      });
    }
  };
}

// GET_COUNTRIES_BY_FILTER
export function getCountriesxFilter(continent, name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/countries?continent=${continent}&name=${name}`
      );
      dispatch({
        type: GET_COUNTRIES_BY_FILTER,
        payload: response.data, // -> trae objeto con ese país
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_RECEIVED_2, // -> cambio el flag de la prop "error"
      });
      // alert("No se encontraron países");
    }
  };
}

// POST_NEW_ACTIVITY
export const postNewActivity = (values) => {
  return async function (dispatch) {
    try {
      var response = await axios.post("/activities", values);
      return dispatch({
        type: "POST_NEW_ACTIVITY",
        payload: response.data,
      });
    } catch (error) {}
  };
};

// GET ALL ACTIVITIES
export const getAllActivities = () => async (dispatch) => {
  const response = await axios.get("/activities");
  dispatch({
    type: GET_ALL_ACTIVITIES,
    payload: response.data,
  });
};

// EMPTY STATE (en el FRONT)
export const emptyState = () => (dispatch) => {
  dispatch({
    type: EMPTY_STATE,
  });
};

// UPDATE COUNTRIES (en el FRONT)
export const updateCountries = (value) => (dispatch) => {
  dispatch({
    type: UPDATE_COUNTRIES,
    payload: value,
  });
};

// EMPTY ERROR (en el FRONT)
export const emptyError = () => (dispatch) => {
  dispatch({
    type: EMPTY_ERROR,
  });
};

// COUNTRY BY ACTIVITY (en el FRONT) - la hago en componente HOME
// export const countryByActivity = (value) => (dispatch) => {
//   dispatch({
//     type: COUNTRY_BY_ACTIVITY,
//     payload: value,
//   });
// };

// ↓↓↓↓↓↓↓↓NO PEDIDA↓↓↓↓↓↓↓↓
// export const deleteActivity = (id) => {
//   return {
//     type: DELETE_ACTIVITY,
//     payload: id,
//   };
// };
