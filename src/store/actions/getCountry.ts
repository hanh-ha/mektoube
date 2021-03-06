export const GET_COUNTRY = 'GET_COUNTRYS';
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';
export const GET_COUNTRY_FALSE = 'GET_COUNTRY_FALSE';
export const COUNTRY_FORM = 'COUNTRY_FORM';

export const getCountry = () => {
  return {
    type: GET_COUNTRY,
  };
};
export const getCountrySuccess = data => {
  return {
    type: GET_COUNTRY_SUCCESS,
    data,
  };
};
export const addCountry = value => {
  return {
    type: COUNTRY_FORM,
    value,
  };
};
