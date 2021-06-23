import signupWatcher from './SignUp';

export default function* IndexSaga() {
  yield [signupWatcher()];
}
