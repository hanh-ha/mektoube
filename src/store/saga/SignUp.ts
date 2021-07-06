import requests from '../requests';
import {ENPOINTS} from '../endpoints';
import {put, takeLatest} from 'redux-saga/effects';
import {GET_COUNTRY, GET_COUNTRY_SUCCESS} from '../actions/getCountry';
import {GET_REGION, GET_REGIOM_SUCCESS} from '../actions/getRegion';
import {CITY_FORM, CITY_FORM_SUCCESS} from '../actions/getCity';

import {
  GEOLOCATIONCITY,
  GEOLOCATIONCITY_SUCCESS,
  ZIPCODECITY,
  ZIPCODECITY_SUCCESS,
  ZIPCODECITY_FALSE,
} from '../type';

function* getCountry() {
  try {
    const responseCountry: any = yield requests.get(ENPOINTS.GET_COUNTRY);
    if (responseCountry) {
      yield put({type: GET_COUNTRY_SUCCESS, data: responseCountry});
    }
  } catch (e) {}
}

function* getRegion(action) {
  try {
    const responseRegion: any = yield requests.get(
      `/static/atlas/${action.value}/regions`,
    );
    if (responseRegion) {
      yield put({type: GET_REGIOM_SUCCESS, value: responseRegion});
    }
  } catch (e) {}
}
function* getGeolocationCity(action) {
  try {
    const responseGeolocationCity = yield requests.get('/atlas/location.json', {
      params: {
        latitude: action.latitude,
        longitude: action.longitude,
        unit: 'DEG',
      },
    });
    if (responseGeolocationCity) {
      yield put({
        type: GEOLOCATIONCITY_SUCCESS,
        value: responseGeolocationCity.data.CONTENT.cities,
      });
    }
  } catch (e) {}
}
function* getZipCodeCity(action) {
  try {
    const responseZipcode: any = yield requests.get(
      `/atlas/${action.country}/${action.zipcode}/cities.json`,
    );
    if (responseZipcode?.data?.CONTENT?.cities.length > 0) {
      yield put({
        type: ZIPCODECITY_SUCCESS,
        value: true,
        data: responseZipcode?.data?.CONTENT?.cities,
      });
    } else {
      yield put({type: ZIPCODECITY_FALSE, value: false});
    }
  } catch (e) {
    yield put({type: ZIPCODECITY_FALSE, value: false});
  }
}

function* getCity(action) {
  try {
    const responseCity = yield requests.get(
      `/static/atlas/${action.country}/${action.region}/cities`,
    );
    if (responseCity) {
      yield put({type: CITY_FORM_SUCCESS, value: responseCity});
    }
  } catch (e) {}
}

function* signupWatcher() {
  yield takeLatest(GET_COUNTRY, getCountry);
  yield takeLatest(ZIPCODECITY, getZipCodeCity);
  yield takeLatest(GET_REGION, getRegion);
  yield takeLatest(CITY_FORM, getCity);
  yield takeLatest(GEOLOCATIONCITY, getGeolocationCity);
}
export default signupWatcher;
