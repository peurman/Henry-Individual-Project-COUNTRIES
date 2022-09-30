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

const axios = require("axios");

export const getAllCountries = () => {
  return async function (dispatch) {
    const response = await axios.get("/countries");
    dispatch({
      type: GET_ALL_COUNTRIES,
      payload: response.data,
    });
  };
};
// ↑↑↑↑↑↑↑↑ GET_ALL_COUNTRIES con PROMISES
// export const getAllCountries = () => {
//   return function (dispatch) {
//     axios.get("http://localhost:3001/countries")
//       .then((response) => {
//         dispatch({
//           type: GET_ALL_COUNTRIES,
//           payload: response.data,
//         });
//       });
//   };
// };

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
//           payload: json.data, // -> trae objeto con ese país
//         });
//       });
//   };
// };

export function getCountryxSearch(continent, name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/countries?continent=${continent}&name=${name}`
      );
      dispatch({
        type: GET_COUNTRY_BY_SEARCH,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_RECEIVED_1,
      });
    }
  };
}

export function getCountriesxFilter(continent, name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/countries?continent=${continent}&name=${name}`
      );
      dispatch({
        type: GET_COUNTRIES_BY_FILTER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_RECEIVED_2,
      });
    }
  };
}

export const postNewActivity = (values) => {
  return async function (dispatch) {
    try {
      var response = await axios.post("/activities", values);
      return dispatch({
        type: POST_NEW_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const getAllActivities = () => async (dispatch) => {
  const response = await axios.get("/activities");
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

export const emptyError = () => (dispatch) => {
  dispatch({
    type: EMPTY_ERROR,
  });
};

// export const deleteActivity = (id) => {
//    return async function (dispatch) {
//     try {
//       var response = await axios.delete("/activities", id);
//       return dispatch({
//         type: DELETE_ACTIVITY,
//         payload: response.data,
//       });
//     } catch (error) {}
//   };
// };
