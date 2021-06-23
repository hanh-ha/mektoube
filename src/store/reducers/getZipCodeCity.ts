import {AnyAction, Reducer} from 'redux';
import {GETZIPCODE, ZIPCODECITY_FALSE, ZIPCODECITY_SUCCESS} from '../type';

const initState = {
  data: '',
  zipcode: null,
};
export const getZipCodeCityReducer: Reducer = (
  state = initState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GETZIPCODE: {
      return {
        ...state,
        zipCode: action.value,
      };
    }
    case ZIPCODECITY_SUCCESS: {
      return {
        ...state,
        zipcode: action.value,
        data: action.data,
      };
    }
    case ZIPCODECITY_FALSE: {
      return {
        ...state,
        zipcode: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
