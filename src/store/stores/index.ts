import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import signupWatcher from '../saga/SignUp';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(signupWatcher);

export default store;
