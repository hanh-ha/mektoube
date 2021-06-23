import {ZIPCODECITY, ZIPCODECITY_SUCCESS, ZIPCODECITY_FALSE} from '../type';

export const getZipCodeCity = (country, zipcode) => {
  return {
    type: ZIPCODECITY,
    country,
    zipcode,
  };
};
export const getZipCodeCitySuccess = (value, data) => {
  return {
    type: ZIPCODECITY_SUCCESS,
    value,
    data,
  };
};
export const getZipCodeCityFalse = value => {
  return {
    type: ZIPCODECITY_FALSE,
    value,
  };
};
