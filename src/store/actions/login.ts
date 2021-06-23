import {LOGIN, LOGIN_SUCCESS, LOGIN_FALSE, LOG_OUT} from '../type';

export const login = (email: string, password: any) => {
  return {
    type: LOGIN,
    email,
    password,
  };
};
export const loginSuccess = (token: any, puk) => {
  return {
    type: LOGIN_SUCCESS,
    token,
    puk,
  };
};
export const loginfalse = value => {
  return {
    type: LOGIN_FALSE,
    value,
  };
};
export const logout = token => {
  return {
    type: LOG_OUT,
    token,
  };
};
