import {combineReducers} from 'redux';
import {LoginReducer} from './login';
import {entyFormReducer} from './signUp';
import {getCountryReducer} from './getCountry';
import {getRegionReducer} from './getRegion';
import {getCityReducer} from './getCity';
import {postSignUpReducer} from './postSignUp';
import {getUserReducer} from './getUser';
import {logOutReducer} from './logOut';
import {getGeolocationCityReducer} from './getGeolocationCity';
import {getZipCodeCityReducer} from './getZipCodeCity';
import {IApplicationState} from './state';

const rootReducer = combineReducers<IApplicationState>({
  signIn: LoginReducer,
  signUp: entyFormReducer,
  Country: getCountryReducer,
  Region: getRegionReducer,
  City: getCityReducer,
  postSignUp: postSignUpReducer,
  getUsers: getUserReducer,
  logOut: logOutReducer,
  getGeolocationCity: getGeolocationCityReducer,
  getZipCodeCity: getZipCodeCityReducer,
});
export default rootReducer;
