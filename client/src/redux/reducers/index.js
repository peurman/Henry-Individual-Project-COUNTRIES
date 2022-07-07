// Importa las action types acá
import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_COUNTRY_BY_SEARCH,
  GET_COUNTRIES_BY_FILTER,
  POST_NEW_ACTIVITY,
  GET_ALL_ACTIVITIES,
  EMPTY_STATE,
  UPDATE_COUNTRIES,
  ERROR_RECEIVED_1,
  ERROR_RECEIVED_2,
  EMPTY_ERROR,
  // COUNTRY_BY_ACTIVITY, // -> lo hago en Home
  // DELETE_ACTIVITY, // NO PEDIDA
} from "../actions";

const initialState = {
  countries: [],
  countriesBackUp: [],
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
        countriesBackUp: action.payload, // hago backup para seguir trabajando con essos paises
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
        countriesBackUp: action.payload, // hago backup para seguir trabajando con essos paises
      };
    case GET_COUNTRIES_BY_FILTER:
      return {
        ...state,
        countries: action.payload, // todos los paises que salgan por busqueda
        countriesBackUp: action.payload, // hago backup para seguir trabajando con essos paises
      };
    case POST_NEW_ACTIVITY:
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
        countryDetail: {}, // -> vacio detalle país
      };
    case UPDATE_COUNTRIES:
      return {
        ...state,
        countries: action.payload, // actualizo países
      };
    case ERROR_RECEIVED_1:
      return {
        ...state,
        error: 1, // error en el search pais
      };
    case ERROR_RECEIVED_2:
      return {
        ...state,
        error: 2, // error en el filtro x continente
      };
    case EMPTY_ERROR:
      return {
        ...state,
        error: 0, // -> vacío error
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
    //     // activities: action.payload // state.activities.filter(({ id }) => id !== action.payload),
    //   };
    default:
      return state;
  }
};

export default rootReducer;
