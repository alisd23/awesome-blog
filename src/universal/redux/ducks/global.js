import { UPDATE_LOCATION } from 'react-router-redux';
import { Observable } from 'rxjs/Observable';
import { SOLID, TRANSPARENT} from '../../components/navbar/NavbarTypes';
import action from '../action';
import combineCoordinators from '../combineCoordinators';

//----------------------------//
//        ACTION TYPES        //
//----------------------------//

const CHANGE_NAVBAR = 'CHANGE_NAVBAR';
const STICK_NAVBAR = 'STICK_NAVBAR';
const UNSTICK_NAVBAR = 'UNSTICK_NAVBAR';
const TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const PAGE_LOAD = 'PAGE_LOAD';
const PAGE_LOADING_START = 'PAGE_LOADING_START';
const PAGE_LOADING_END = 'PAGE_LOADING_END';

/**
 * Initial Global state
 * @type {Object} - State
 *  - navbarType:    Defines the style foe the navbar
 *  - offTop:        True if user is NOT at the top of the page
 *  - mobileNavOpen: True if mobile nav is open
 *  - openModal:     The current open modal (if any)
 *  - pageLoading:   Whether the app is loading
 */
const initialState = {
  navbarType: SOLID,
  offTop: false,
  mobileNavOpen: false,
  openModal: null,
  pageLoading: false
}

//-------------------------//
//         REDUCER         //
//-------------------------//

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case PAGE_LOADING_START:
      return { ...state, pageLoading: true };
    case PAGE_LOADING_END:
      return { ...state, pageLoading: false };
    case CHANGE_NAVBAR:
      return { ...state, navbarType: payload.navbarType };
    case CHANGE_NAVBAR:
      return { ...state, navbarType: payload.navbarType };
    case STICK_NAVBAR:
      return { ...state, offTop: false };
    case UNSTICK_NAVBAR:
      return { ...state, offTop: true };
    case TOGGLE_MOBILE_NAV:
      const mobileNavOpen =  payload.open != undefined ? payload.open : !state.mobileNavOpen
      return { ...state, mobileNavOpen };
    case OPEN_MODAL:
      return { ...state, openModal: payload.modal };
    case CLOSE_MODAL:
      return { ...state, openModal: null };
    default:
      // If any state field doesn't exist, use initial state
      return state;
  };
}

//----------------------------//
//           ACTIONS          //
//----------------------------//

export const changeNavbarType = (navbarType) =>
  action(CHANGE_NAVBAR, { navbarType });

export const startPageChange = (actions, { getState }) => (
  !getState().global.pageLoading
    ? [{ type: PAGE_LOAD }]
    : []
);

const pageLoadingStart = () =>
  action(PAGE_LOADING_START);

export const pageLoadingEnd = () =>
  action(PAGE_LOADING_END);

export const toggleMobileNav = (open: boolean) =>
  action(TOGGLE_MOBILE_NAV, { open });

// Dispatches the stick or unstick navbar actions depending on if the user
// has just scroll OFF or TO the top of the page
export const scrolled = (topOffset: number) => (
  (actions, { getState }) => {
    if (topOffset === 0 && getState().global.offTop) {
      return [{ type: STICK_NAVBAR }];
    } else if (topOffset !== 0 && !getState().global.offTop) {
      return [{ type: UNSTICK_NAVBAR }];
    } else {
      return [];
    }
  }
);

export const openModal = (modal) =>
  action(OPEN_MODAL, { modal });

// Only dispatches close Action if relevant modal is open
export const closeModal = (modal) => (
  (actions, { getState }) => (
    getState().global.openModal === modal
      ? [{ type: CLOSE_MODAL }]
      : []
  )
);

//------------------------------//
//         COORDINATORS         //
//------------------------------//

// Throttle for 200ms so loader doesn't show for quick loads
const PAGE_WAIT = 200;

const pageChangeCoordinator = (action$, { getState }) =>
  action$
    .ofType(PAGE_LOAD)
    .switchMap(action =>
      Observable
        .of(pageLoadingStart())
        .delay(PAGE_WAIT)
        .takeUntil(action$.ofType(PAGE_LOADING_END))
    );

export const coordinator = combineCoordinators(
  pageChangeCoordinator
);
