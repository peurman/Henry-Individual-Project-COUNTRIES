// Importa las action types acá
import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_COUNTRY_BY_SEARCH,
  GET_COUNTRIES_BY_FILTER,
  CREATE_ACTIVITY,
  GET_ALL_ACTIVITIES,
  EMPTY_STATE,
  UPDATE_COUNTRIES,
  ERROR_RECEIVED,
  EMPTY_ERROR,
  // COUNTRY_BY_ACTIVITY, // -> lo hago en Home
  // DELETE_ACTIVITY, // NO PEDIDA
} from "../actions";

const initialState = {
  countries: [],
  countryDetail: {},
  activityDetail: {},
  activities: [],
  error: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload, //solo actualizo esta prop
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload, //solo actualizo esta prop
      };
    case GET_COUNTRY_BY_SEARCH:
      return {
        ...state,
        countries: action.payload, // todos los paises que salgan por busqueda
      };
    case GET_COUNTRIES_BY_FILTER:
      return {
        ...state,
        countries: action.payload, // todos los paises que salgan por busqueda
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        activityDetail: action.payload, //solo actualizo esta prop
      };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case EMPTY_STATE:
      return {
        ...state,
        countryDetail: {},
      };
    case UPDATE_COUNTRIES:
      return {
        ...state,
        countries: action.payload, // todos los paises ordenados
      };
    case ERROR_RECEIVED:
      return {
        ...state,
        error: 1, // todos los paises ordenados
      };
    case EMPTY_ERROR:
      return {
        ...state,
        error: 0, // todos los paises ordenados
      };
    // case COUNTRY_BY_ACTIVITY: // -> lo hago en componente HOME
    //   const allcountries = state.countries;
    //   const countriesFiltered = allcountries.filter((c) =>
    //           c.activities.find((a) => a.id === action.payload)
    //         );
    //   return {
    //     ...state,
    //     countries: countriesFiltered, // los paises filtrados segun actividad
    //   };

    // ↓↓↓↓↓↓↓↓NO PEDIDA↓↓↓↓↓↓↓↓
    // case DELETE_ACTIVITY:
    //   return {
    //     // ...state,
    //     // activities: state.activities.filter(({ id }) => id !== action.payload),
    //   };
    default:
      return state;
  }
};

export default rootReducer;
