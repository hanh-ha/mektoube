import signupWatcher from './SignUp';
import discovery from './discovery';
import Login from './Login';
import postSignUpWatcher from './postSignUp';
import {all, fork} from 'redux-saga/effects';

export default function* IndexSaga() {
  yield all([
    fork(signupWatcher),
    fork(discovery),
    fork(Login),
    fork(postSignUpWatcher),
  ]);
}
