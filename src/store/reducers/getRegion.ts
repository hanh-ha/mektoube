import {AnyAction, Reducer} from 'redux';
import {
  GET_REGION,
  GET_REGIOM_SUCCESS,
  REGION_FORM,
} from '../actions/getRegion';

const initState = {
  country: '',
  data: '',
  region: '',
};
export const getRegionReducer: Reducer = (
  state = initState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_REGION: {
      return {
        ...state,
      };
    }
    case GET_REGIOM_SUCCESS: {
      return {
        ...state,
        data: action.value,
      };
    }
    case REGION_FORM: {
      return {
        ...state,
        region: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
