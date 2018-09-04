import { call, put, race, take } from 'redux-saga/effects';
import request from 'utils/request';
import i18n from 'i18next';
import message from 'components/message';
import { LOCATION_CHANGE } from 'react-router-redux';
import { TEST_SAGA } from './constants';
import {
  testSagaSuccess,
} from './actions';

export default [
  getTestWatcher,
];

export function* getTestWatcher() {
  while (true) { // eslint-disable-line
    const watcher = yield race({
      testSaga: take(TEST_SAGA),
      stop: take(LOCATION_CHANGE),
    });

    if (watcher.stop) break;

    yield call(updateSagaData, watcher.testSaga.sagaData);
  }
}

export function* updateSagaData(sagaData) {
  // const requestURL = '/users?_page=1&_limit=5';
  // const result = yield call(request, requestURL);
  message.success(i18n.t('common.update_success'));
  yield put(testSagaSuccess(sagaData));
}
