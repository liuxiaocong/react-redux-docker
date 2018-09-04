/*
 *
 * Global actions
 *
 */

import {
  TEST,
  TEST_SAGA,
  TEST_SAGA_SUCCESS,
} from './constants';

export function test(data) {
  return {
    type: TEST,
    data,
  };
}

export function testSaga(sagaData) {
  return {
    type: TEST_SAGA,
    sagaData,
  };
}


export function testSagaSuccess(sagaData) {
  return {
    type: TEST_SAGA_SUCCESS,
    sagaData,
  };
}