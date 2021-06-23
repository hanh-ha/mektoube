import {LOG_OUT} from '../type';

export const logOut = value => {
  return {
    type: LOG_OUT,
    value,
  };
};
