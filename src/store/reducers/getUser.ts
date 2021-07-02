import {AnyAction, Reducer} from 'redux';
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_PLACEHOLDER,
} from '../actions/getUser';

const initState = {
  data: '',
  isDataFetched: true,
};
export const getUserReducer: Reducer = (
  state = initState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
      };
    }
    case GET_USER_PLACEHOLDER: {
      return {
        ...state,
        isDataFetched: action.value,
      };
    }
    case GET_USER_SUCCESS: {
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
