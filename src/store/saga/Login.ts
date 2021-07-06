import {LOGIN, LOGIN_SUCCESS, LOGIN_FALSE} from '../type';
import {race, put, takeLatest, delay} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import requests from '../requests';

function* postLogin(action) {
  try {
    const response = requests.post(`/gate/${action.email}`, {
      login: action.email,
      password: action.password,
      validitySeconds: 7776000,
    });
    const {posts} = yield race({
      posts: response,
      timeout: delay(7000),
    });
    if (posts) {
      yield put({
        type: LOGIN_SUCCESS,
        token: posts.data.CONTENT.token,
        puk: posts.data.CONTENT.puk,
      });
      const token = posts.data.CONTENT.token;
      const puk = posts.data.CONTENT.puk;
      yield AsyncStorage.multiSet(
        [
          ['AccessToken', token],
          ['AccessPuk', puk],
        ],
        err => {
          console.log('ERROR saveTokenToStore: ', err);
        },
      );
      //   yield put({type: LOG_OUT, value: token});
      yield put({type: LOGIN_FALSE, value: false});
    } else {
      yield put({type: LOGIN_FALSE, value: true});
    }
  } catch (e) {
    yield put({type: LOGIN_FALSE, value: true});
  }
}
function* login() {
  yield takeLatest(LOGIN, postLogin);
}
export default login;
