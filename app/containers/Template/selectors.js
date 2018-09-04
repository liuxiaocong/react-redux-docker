import { createSelector } from 'reselect';

const selectTemplateDomain = () => (state) => state.get('template');

const selectData = () => createSelector(
  selectTemplateDomain(),
  (substate) => substate.get('data')
);

const selectSagaData = () => createSelector(
  selectTemplateDomain(),
  (substate) => substate.get('sagaData')
);

export {
  selectData,
  selectSagaData,
};
