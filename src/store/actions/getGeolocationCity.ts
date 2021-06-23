import {GEOLOCATIONCITY} from '../type';

export const getGeolocationCity = (latitude, longitude) => {
  return {
    type: GEOLOCATIONCITY,
    latitude,
    longitude,
  };
};
