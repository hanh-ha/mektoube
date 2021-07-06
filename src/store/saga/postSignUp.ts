import {
  POST_SIGN_UP,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FALSE,
} from '../actions/postSignUp';
import {put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import requests from '../requests';
import {LOG_OUT} from '../type';

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
    console.log('e', e);
    yield put({type: POST_SIGN_UP_FALSE, value: false});
  }
}
function* postSignUpWatcher() {
  yield takeLatest(POST_SIGN_UP, postSignUp);
}
export default postSignUpWatcher;
