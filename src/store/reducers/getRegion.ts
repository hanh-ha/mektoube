import {AnyAction, Reducer} from 'redux';
import {GET_REGION, GET_REGIOM_SUCCESS} from '../actions/getRegion';

const initState = {
  country: '',
  data: '',
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
    default: {
      return state;
    }
  }
};
