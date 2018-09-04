import { call, put, race, take } from 'redux-saga/effects';
import request from 'utils/request';
import i18n from 'i18next';
import message from 'components/message';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_USER_INFO } from './constants';
import {
  loadUserInfoError,
  loadUserInfoSuccess,
} from './actions';

export default [
  getUserInfoWatcher,
];

// Individual exports for testing
export function* getUserInfoWatcher() {
  while (true) { // eslint-disable-line
    const watcher = yield race({
      loadUserInfo: take(LOAD_USER_INFO),
      stop: take(LOCATION_CHANGE),
    });

    if (watcher.stop) break;

    yield call(getUserInfo);
  }
}

export function* getUserInfo() {
  const requestURL = '/users?_page=1&_limit=5';

  const result = yield call(request, requestURL);

  console.log(result);
  // fake res
  const data = {
    user: result[0],
    success: true,
  };
  if (data.success) {
    const currentUser = data.user;
    yield put(loadUserInfoSuccess(currentUser));
  } else {
    yield put(loadUserInfoError());
    console.log(result.message); // eslint-disable-line no-console
  }
}
