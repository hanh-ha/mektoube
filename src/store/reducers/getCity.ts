import {AnyAction, Reducer} from 'redux';
import {CITY_FORM, CITY_FORM_SUCCESS} from '../actions/getCity';

const InitState = {
  data: '',
};
export const getCityReducer: Reducer = (
  state = InitState,
  action: AnyAction,
) => {
  switch (action.type) {
    case CITY_FORM: {
      return {
        ...state,
      };
    }
    case CITY_FORM_SUCCESS: {
      return {
        ...state,
        data: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
