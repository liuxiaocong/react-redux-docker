/*
 *
 * Template reducer
 *
 */

import { fromJS } from 'immutable';

import {
  TEST,
  TEST_SAGA_SUCCESS,
} from './constants';

const initialState = fromJS({
  data: null,
  sagaData: null,
});

function templateReducer(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return state
        .set('data', action.data);
    case TEST_SAGA_SUCCESS:
      return state
      .set('sagaData', action.sagaData);
    default:
      return state;
  }
}

export default templateReducer;
