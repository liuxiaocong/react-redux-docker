/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
  previousPathname: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* eslint-disable */
    case LOCATION_CHANGE:
      const invalidPreviousRouteRegex = /^\/(login|signup|forgot-password|reset-password|set-password)/g;
      let previousRoute = state.get('locationBeforeTransitions') ? state.getIn(['locationBeforeTransitions', 'pathname']) : '/';
      const newState = {
        locationBeforeTransitions: action.payload,
      };
      if (!previousRoute.match(invalidPreviousRouteRegex)) {
        newState.previousPathname = previousRoute;
      }
      return state.merge(newState);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  const appReducer = combineReducers({
    route: routeReducer,
    ...asyncReducers,
  });

  return (state, action) => {
    let newState = state;
    if (action.type === 'logout') {

    }
    return appReducer(newState, action);
  };
}
