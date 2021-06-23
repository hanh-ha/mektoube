import {AnyAction, Reducer} from 'redux';
import {GET_COUNTRY, GET_COUNTRY_SUCCESS} from '../actions/getCountry';
const InitState = {
  data: '',
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
    default:
      return state;
  }
};
