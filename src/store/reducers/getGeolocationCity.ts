import {AnyAction, Reducer} from 'redux';
import {GEOLOCATIONCITY_SUCCESS} from '../type';

const initState = {
  data: '',
};
export const getGeolocationCityReducer: Reducer = (
  state = initState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GEOLOCATIONCITY_SUCCESS: {
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
