import {
  POST_SIGN_UP,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FALSE,
} from '../actions/postSignUp';
import {AnyAction, Reducer} from 'redux';

const innitState = {
  token: null,
  puk: null,
  loading: false,
};
export const postSignUpReducer: Reducer = (
  state = innitState,
  action: AnyAction,
) => {
  switch (action.type) {
    case POST_SIGN_UP: {
      return {
        loading: true,
      };
    }
    case POST_SIGN_UP_SUCCESS: {
      return {
        ...state,
        token: action.token,
        puk: action.puk,
        loading: false,
      };
    }
    case POST_SIGN_UP_FALSE: {
      return {
        ...state,
        loading: action.value,
      };
    }
    default:
      return state;
  }
};
