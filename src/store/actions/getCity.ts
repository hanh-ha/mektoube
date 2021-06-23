export const CITY_FORM = 'CITY_FORM';
export const CITY_FORM_SUCCESS = 'CITY_FORM_SUCCESS';

export const getCity = (country, region) => {
  return {
    type: CITY_FORM,
    country,
    region,
  };
};
export const getCitySuccess = value => {
  return {
    type: CITY_FORM_SUCCESS,
    value,
  };
};
