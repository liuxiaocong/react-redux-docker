import {createSelector} from 'reselect';

/**
 * Direct selector to the global state domain
 */
const selectGlobalDomain = () => (state) => state.get('global');

/**
 * Other specific selectors
 */
const selectCurrentLanguage = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('lang')
);

const selectCurrentUser = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('currentUser')
);

const selectUserInfoLoading = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.get('userInfoLoading')
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobalDomain,
  selectCurrentUser,
  selectCurrentLanguage,
  selectUserInfoLoading,
  selectLocationState,
};
