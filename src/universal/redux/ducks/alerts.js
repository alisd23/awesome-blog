import { createSelector } from 'reselect';
import uuid from 'uuid';
import action from '../action';
import combineCoordinators from '../combineCoordinators';
import { DEFAULT_ALERT_TYPE } from '../../components/alerts/AlertTypes';

const ALERT_LIFESPAN = 4000;

//----------------------------//
//        ACTION TYPES        //
//----------------------------//

const ADD_ALERT = 'ADD_ALERT';
const REMOVE_ALERT = 'REMOVE_ALERT';


//--------------------------//
//         REDUCERS         //
//--------------------------//

export default function reducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_ALERT:
      return [
        ...state,
        payload
      ];
    case REMOVE_ALERT:
      return state.filter(({ id }) => id !== payload.id);
    default:
      return state;
  };
}

//----------------------------//
//           ACTIONS          //
//----------------------------//

// Liking/Unliking of article actions
export const addAlert = ({ title, content, type }) =>
  action(ADD_ALERT, {
    id: uuid.v1(),
    type: type || DEFAULT_ALERT_TYPE,
    title,
    content,
  });

export const removeAlert = (id) =>
  action(REMOVE_ALERT, { id });

//------------------------------//
//         COORDINATORS         //
//------------------------------//

const alertCoordinator = (action$, { getState }) =>
  action$
    .ofType(ADD_ALERT)
    .delay(ALERT_LIFESPAN)
    .map(({ payload }) => payload.id)
    .filter(alertId => Boolean(findAlert(getState(), { alertId })))
    .map(removeAlert);

export const coordinator = combineCoordinators(
  alertCoordinator
);

//------------------------------//
//           SELECTORS          //
//------------------------------//

export const getAlerts = state => state.alerts;
export const getFirstAlert = createSelector(
  getAlerts,
  alerts => alerts[0]
);
const getAlertIdParam = (state, params) => params.alertId;

const findAlert = createSelector(
  getAlerts,
  getAlertIdParam,
  (alerts, id) => alerts.find(a => a.id === id)
);
