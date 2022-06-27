export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const GET_COUNTRY_BY_SEARCH = "GET_COUNTRY_BY_SEARCH";
export const GET_COUNTRIES_BY_FILTER = "GET_COUNTRIES_BY_FILTER";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const EMPTY_STATE = "EMPTY_STATE";
export const UPDATE_COUNTRIES = "UPDATE_COUNTRIES";
// export const DELETE_ACTIVITY = "DELETE_ACTIVITY"; // NO PEDIDA

const axios = require("axios"); // también uso fetch

// GET_ALL_COUNTRIES con AXIOS
export const getAllCountries = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/countries");
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
    const response = await axios.get("http://localhost:3001/countries/" + id);
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
export function getCountryxSearch(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      dispatch({
        type: GET_COUNTRY_BY_SEARCH,
        payload: response.data, // -> trae objeto con ese país
      });
    } catch (error) {
      console.log(error);
      alert("No se encontraron países");
    }
  };
}

// GET_COUNTRIES_BY_FILTER
export function getCountriesxFilter(filter) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries?filter=${filter}`
      );
      dispatch({
        type: GET_COUNTRIES_BY_FILTER,
        payload: response.data, // -> trae objeto con ese país
      });
    } catch (error) {
      console.log(error);
      alert("No se encontraron países");
    }
  };
}

// CREATE_ACTIVITY
export const createActivity = (values) => {
  return async function (dispatch) {
    try {
      var response = await axios.post(
        "http://localhost:3001/activities",
        values
      );
      return dispatch({
        type: "CREATE_ACTIVITY",
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const getAllActivities = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/activities");
  dispatch({
    type: GET_ALL_ACTIVITIES,
    payload: response.data,
  });
};

export const emptyState = () => (dispatch) => {
  dispatch({
    type: EMPTY_STATE,
  });
};

export const updateCountries = (value) => (dispatch) => {
  dispatch({
    type: UPDATE_COUNTRIES,
    payload: value,
  });
};

// ↓↓↓↓↓↓↓↓NO PEDIDA↓↓↓↓↓↓↓↓
// export const deleteActivity = (id) => {
//   return {
//     type: DELETE_ACTIVITY,
//     payload: id,
//   };
// };
