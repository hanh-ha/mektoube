export const POST_SIGN_UP = 'POST_SIGN_UP';
export const POST_SIGN_UP_SUCCESS = 'POST_SIGN_UP_SUCCESS';
export const POST_SIGN_UP_FALSE = 'POST_SIGN_UP_FALSE';

export const postSignUp = value => {
  return {
    type: POST_SIGN_UP,
    value,
  };
};
export const postSignUpSuccess = (token, puk) => {
  return {
    type: POST_SIGN_UP_SUCCESS,
    token,
    puk,
  };
};
export const postSignUpFail = value => {
  return {
    type: POST_SIGN_UP_FALSE,
    value,
  };
};
