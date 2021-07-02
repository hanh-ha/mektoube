import {LOG_OUT} from '../type';
import {AnyAction, Reducer} from 'redux';

const initState = {
  activeLogout: true,
};
export const logOutReducer: Reducer = (
  state = initState,
  action: AnyAction,
) => {
  switch (action.type) {
    case LOG_OUT: {
      return {
        ...state,
        activeLogout: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
