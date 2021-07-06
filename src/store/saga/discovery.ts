import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_PLACEHOLDER,
} from '../actions/getUser';
import {put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import requests from '../requests';

function* getUser(action) {
  const token = yield AsyncStorage.getItem('AccessToken');
  const puk = yield AsyncStorage.getItem('AccessPuk');
  try {
    const user = yield requests.get(
      `/pool/.json?order=DEFAULT&size=20&timeStamp=1625466805509&start=${action.value}`,
      {
        headers: {
          'x-asgard-puk': puk,
          'x-asgard-token': token,
        },
      },
    );
    if (user.data.CONTENT.USERS) {
      yield put({
        type: GET_USER_SUCCESS,
        value: user.data.CONTENT.USERS,
      });
      yield put({
        type: GET_USER_PLACEHOLDER,
        value: false,
      });
    }
  } catch (e) {
    yield put({
      type: GET_USER_PLACEHOLDER,
      value: false,
    });
  }
}
function* discovery() {
  yield takeLatest(GET_USER, getUser);
}
export default discovery;
