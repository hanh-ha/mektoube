import requests from '../requests';
import {ENPOINTS} from '../endpoints';
import {put, takeLatest} from 'redux-saga/effects';
import {LOGIN, LOGIN_SUCCESS, LOGIN_FALSE, LOG_OUT} from '../type';
import {GET_COUNTRY, GET_COUNTRY_SUCCESS} from '../actions/getCountry';
import {GET_REGION, GET_REGIOM_SUCCESS} from '../actions/getRegion';
import {CITY_FORM, CITY_FORM_SUCCESS} from '../actions/getCity';
import {
  POST_SIGN_UP,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FALSE,
} from '../actions/postSignUp';
import {
  GET_USER,
  GET_USER_SUCCESS,
  // GET_USER_PLACEHOLDER,
} from '../actions/getUser';
import {
  GEOLOCATIONCITY,
  GEOLOCATIONCITY_SUCCESS,
  ZIPCODECITY,
  ZIPCODECITY_SUCCESS,
  ZIPCODECITY_FALSE,
} from '../type';
import AsyncStorage from '@react-native-community/async-storage';
function* postLogin(action) {
  try {
    const response: any = yield requests.post(`/gate/${action.email}`, {
      login: action.email,
      password: action.password,
      validitySeconds: 7776000,
    });
    if (response) {
      yield put({
        type: LOGIN_SUCCESS,
        token: response.data.CONTENT.token,
        puk: response.data.CONTENT.puk,
      });

      const token = response.data.CONTENT.token;
      const puk = response.data.CONTENT.puk;
      yield AsyncStorage.multiSet(
        [
          ['AccessToken', token],
          ['AccessPuk', puk],
        ],
        err => {
          console.log('ERROR saveTokenToStore: ', err);
        },
      );
      yield put({type: LOG_OUT, value: token});
      yield put({type: LOGIN_FALSE, value: false});
    }
  } catch (e) {
    yield put({type: LOGIN_FALSE, value: true});
  }
}
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

function* postSignUp(action) {
  try {
    const responseSignUp = yield requests.post(
      '/pool/.json?new_key_signup=true',
      action.value,
    );
    if (responseSignUp) {
      const puk = responseSignUp?.data?.CONTENT?.AUTH?.puk;
      const token = responseSignUp?.data?.CONTENT?.AUTH?.token;
      yield put({
        type: POST_SIGN_UP_SUCCESS,
        token: token,
        puk: puk,
      });
      yield AsyncStorage.multiSet(
        [
          ['AccessToken', token],
          ['AccessPuk', puk],
        ],
        err => {
          console.log('ERROR saveTokenToStore: ', err);
        },
      );
      // const getToken = yield AsyncStorage.getItem('AccessToken');
      // const getPuk = yield AsyncStorage.getItem('AccessPuk');
      yield put({type: LOG_OUT, value: token});
    } else {
      yield put({type: POST_SIGN_UP_FALSE, value: false});
    }
  } catch (e) {
    yield put({type: POST_SIGN_UP_FALSE, value: false});
  }
}

function* getUser(action) {
  const getToken = yield AsyncStorage.getItem('AccessToken');
  const getPuk = yield AsyncStorage.getItem('AccessPuk');
  const user = yield requests.get(
    `/pool/.json?order=DEFAULT&size=20&start=${action.value}`,
    {
      headers: {
        'x-asgard-puk': getPuk,
        'x-asgard-token': getToken,
      },
    },
  );
  if (user) {
    yield put({
      type: GET_USER_SUCCESS,
      value: user.data.CONTENT.USERS,
    });
    // yield put({
    //   type: GET_USER_PLACEHOLDER,
    //   value: false,
    // });
  }
}
function* signupWatcher() {
  yield takeLatest(LOGIN, postLogin);
  yield takeLatest(GET_COUNTRY, getCountry);
  yield takeLatest(ZIPCODECITY, getZipCodeCity);
  yield takeLatest(GET_REGION, getRegion);
  yield takeLatest(CITY_FORM, getCity);
  yield takeLatest(POST_SIGN_UP, postSignUp);
  yield takeLatest(GEOLOCATIONCITY, getGeolocationCity);
  yield takeLatest(GET_USER, getUser);
}
export default signupWatcher;
