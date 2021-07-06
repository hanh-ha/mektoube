import {AnyAction, Reducer} from 'redux';
import {
  ENTRYFORM,
  BIRTHDAY_FORM,
  ORIGIN_FORM,
  CITY_FORM,
} from '../actions/signUp';

const initState = {
  gender: '',
  birthday: '',
  origin: '',
  geoname_id: '',
  firstname: '',
  email: '',
  password: '',
  affiliate: '1',
  mailing: '1',
};
export const entyFormReducer: Reducer = (
  state = initState,
  action: AnyAction,
) => {
  switch (action.type) {
    case ENTRYFORM: {
      return {
        ...state,
        gender: action.value,
      };
    }
    case BIRTHDAY_FORM: {
      return {
        ...state,
        birthday: action.value,
      };
    }
    case ORIGIN_FORM: {
      return {
        ...state,
        origin: action.value,
      };
    }
    case CITY_FORM: {
      return {
        ...state,
        geoname_id: action.value,
      };
    }

    default:
      return state;
  }
};
