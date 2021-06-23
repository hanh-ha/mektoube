import {LOGIN, LOGIN_SUCCESS, LOG_OUT, LOGIN_FALSE} from '../type';
import {AnyAction, Reducer} from 'redux';

const initState = {
  token: null,
  loading: false,
  puk: null,
  loginFalse: false,
};

export const LoginReducer: Reducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.token,
        puk: action.puk,
        loading: false,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        token: action.token,
      };
    }
    case LOGIN_FALSE: {
      return {
        ...state,
        loginFalse: action.value,
        loading: false,
      };
    }
    default:
      return state;
  }
};
