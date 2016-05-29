import { UPDATE_LOCATION } from 'react-router-redux';
import { Observable } from 'rxjs/Rx';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';
import Modals from '../../constants/Modals';

// Action constants
const CHANGE_NAVBAR = 'CHANGE_NAVBAR';
const STICK_NAVBAR = 'STICK_NAVBAR';
const UNSTICK_NAVBAR = 'UNSTICK_NAVBAR';
const TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
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

/**
 * Global reducer. Handles the 'global/general'  state.
 * @param  {Object} state   - Current global state
 * @param  {Object} action  - Next action to process
 * @return {Object}         - Next global state
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_LOADING_START:
      return { ...state, pageLoading: true };
    case PAGE_LOADING_END:
      return { ...state, pageLoading: false };
    case CHANGE_NAVBAR:
      return { ...state, navbarType: action.navbarType };
    case CHANGE_NAVBAR:
      return { ...state, navbarType: action.navbarType };
    case STICK_NAVBAR:
      return { ...state, offTop: false };
    case UNSTICK_NAVBAR:
      return { ...state, offTop: true };
    case TOGGLE_MOBILE_NAV:
      const mobileNavOpen =  action.open != undefined ? action.open : !state.mobileNavOpen
      return { ...state, mobileNavOpen };
    case OPEN_MODAL:
      return { ...state, openModal: action.modal };
    case CLOSE_MODAL:
      return { ...state, openModal: null };
    default:
      // If any state field doesn't exist, use initial state
      return { ...initialState, ...state };
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export const changeNavbarType = (type) => () => (
   Observable.of({
    type: CHANGE_NAVBAR,
    navbarType: type
  })
);

// Throttle for 200ms so loader doesn't show for quick loads
const pageWait = 200;

export const startPageChange = (actions, { getState }) => (
  !getState().global.pageLoading
    ? Observable
        .of({ type: PAGE_LOADING_START })
        .delay(pageWait)
        .takeUntil(actions.ofType(PAGE_LOADING_END))
    : Observable.empty()
);

export const endPageChange = (actions, { getState }) => (
  Observable.of({ type: PAGE_LOADING_END })
);

export const toggleMobileNav = (open: boolean) => () => (
  Observable.of({
    type: TOGGLE_MOBILE_NAV,
    open
  })
);

/**
 * Dispatches the stick or unstick navbar actions depending on if the user
 * has just scroll OFF or TO the top of the page
 */
export const scrolled = (topOffset: number) => (
  (actions, { getState }) => {
    if (topOffset === 0 && getState().global.offTop) {
      return Observable.of({ type: STICK_NAVBAR });
    } else if (topOffset !== 0 && !getState().global.offTop) {
      return Observable.of({ type: UNSTICK_NAVBAR });
    } else {
      return Observable.empty();
    }
  }
);

export const openModal = (modal) => () => (
  Observable.of({
    type: OPEN_MODAL,
    modal
  })
);

/**
 * Only dispatches close Action if relevant modal is open
 */
export const closeModal = (modal) => (
  (actions, { getState }) => (
    getState().global.openModal === modal
      ? Observable.of({ type: CLOSE_MODAL })
      : Observable.empty()
  )
);
