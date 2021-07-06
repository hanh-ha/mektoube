import {AnyAction, Reducer} from 'redux';
import {
  GET_COUNTRY,
  GET_COUNTRY_SUCCESS,
  COUNTRY_FORM,
} from '../actions/getCountry';
const InitState = {
  data: '',
  country: '',
};
export const getCountryReducer: Reducer = (
  state = InitState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_COUNTRY: {
      return {
        ...state,
      };
    }
    case GET_COUNTRY_SUCCESS: {
      return {
        ...state,
        data: action.data,
      };
    }
    case COUNTRY_FORM: {
      return {
        ...state,
        country: action.value,
      };
    }
    default:
      return state;
  }
};
