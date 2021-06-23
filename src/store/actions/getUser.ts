export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const getUser = () => {
  return {
    type: GET_USER,
  };
};
export const getUserSuccess = value => {
  return {
    type: GET_USER_SUCCESS,
    value,
  };
};
