/*
 *
 * Global actions
 *
 */

import {
  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_SUCCESS,
  CHANGE_LANGUAGE_ERROR,
  LOAD_USER_INFO,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_ERROR,
} from './constants';

export function changeLanguage(lang, currentServerLang) {
  return {
    type: CHANGE_LANGUAGE,
    lang,
    currentServerLang,
  };
}

export function changeLanguageSuccess(lang) {
  return {
    type: CHANGE_LANGUAGE_SUCCESS,
    lang,
  };
}

export function changeLanguageError() {
  return {
    type: CHANGE_LANGUAGE_ERROR,
  };
}

export function loadUserInfo() {
  return {
    type: LOAD_USER_INFO,
  };
}

export function loadUserInfoSuccess(currentUser) {
  return {
    type: LOAD_USER_INFO_SUCCESS,
    currentUser,
  };
}

export function loadUserInfoError() {
  return {
    type: LOAD_USER_INFO_ERROR,
  };
}
