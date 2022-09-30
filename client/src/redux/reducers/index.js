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
        countries: action.payload,
        countriesBackUp: action.payload,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case GET_COUNTRY_BY_SEARCH:
      return {
        ...state,
        countries: action.payload,
        countriesBackUp: action.payload,
      };
    case GET_COUNTRIES_BY_FILTER:
      return {
        ...state,
        countries: action.payload,
        countriesBackUp: action.payload,
      };
    case POST_NEW_ACTIVITY:
      return {
        ...state,
        activityDetail: action.payload,
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
        countries: action.payload,
      };
    case ERROR_RECEIVED_1:
      return {
        ...state,
        error: 1,
      };
    case ERROR_RECEIVED_2:
      return {
        ...state,
        error: 2,
      };
    case EMPTY_ERROR:
      return {
        ...state,
        error: 0,
      };
    default:
      return state;
  }
};

export default rootReducer;
