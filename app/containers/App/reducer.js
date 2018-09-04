/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import i18next from 'i18next';
import { getBrowserDefaultLanguage } from 'utils/languageHelper';

import {
  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_ERROR,

  SAVE_CALLBACK_ROUTE,
  CLEAR_CALLBACK_ROUTE,

  LOAD_USER_INFO,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_ERROR,

} from './constants';

const initialState = fromJS({
  lang: localStorage.getItem('clientLang') || getBrowserDefaultLanguage() || 'en_GB',

  callbackRoute: localStorage.getItem('callback') || false,

  userInfoLoading: false,

  currentUser: null,
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18next.changeLanguage(action.lang);
      localStorage.setItem('clientLang', action.lang);
      return state
        .set('lang', action.lang);
        // .set('countriesLoading', true);
    case LOAD_USER_INFO:
      return state.set('userInfoLoading', true);
    case LOAD_USER_INFO_SUCCESS:
      return state
        .set('currentUser', fromJS(action.currentUser))
        .set('userInfoLoading', false);
    case LOAD_USER_INFO_ERROR:
      return state
        // .set('currentUser', false)
        .set('userInfoLoading', false);
    default:
      return state;
  }
}

export default globalReducer;
