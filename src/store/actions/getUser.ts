export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_PLACEHOLDER = 'GET_USER_PLACEHOLDER';

export const getUser = value => {
  return {
    type: GET_USER,
    value,
  };
};
export const getUserSuccess = value => {
  return {
    type: GET_USER_SUCCESS,
    value,
  };
};
export const getUserPlaceholder = value => {
  return {
    type: GET_USER_PLACEHOLDER,
    value,
  };
};
