import { UPDATE_LOCATION } from 'react-router-redux';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';
import Modals from '../../constants/Modals';

// Action constants
const CHANGE_NAVBAR = 'CHANGE_NAVBAR';
const STICK_NAVBAR = 'STICK_NAVBAR';
const UNSTICK_NAVBAR = 'UNSTICK_NAVBAR';
const TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

/**
 * Initial Global state
 * @type {Object} - State
 *  - navbarType:    Defines the style foe the navbar
 *  - offTop:        True if user is NOT at the top of the page
 *  - mobileNavOpen: True if mobile nav is open
 *  - openModal:     The current open modal (if any)
 */
const initialState = {
  navbarType: SOLID,
  offTop: false,
  mobileNavOpen: false,
  openModal: null
}

/**
 * Global reducer. Handles the 'global/general'  state.
 * @param  {Object} state   - Current global state
 * @param  {Object} action  - Next action to process
 * @return {Object}         - Next global state
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAVBAR:
      return {
        ...state,
        navbarType: action.navbarType
      };
    case STICK_NAVBAR:
      return {
        ...state,
        offTop: false
      };
    case UNSTICK_NAVBAR:
      return {
        ...state,
        offTop: true
      };
    case TOGGLE_MOBILE_NAV:
      return {
        ...state,
        mobileNavOpen: action.open != undefined ? action.open : !state.mobileNavOpen
      };
    case OPEN_MODAL:
      return {
        ...state,
        openModal: action.modal
      };
    case CLOSE_MODAL:
      return {
        ...state,
        openModal: null
      };
    default:
      // If any state field doesn't exist, use initial state
      return {
        ...initialState,
        ...state
      }
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

/**
 * Action creator for changing the style of the navbar
 * @param  {NavbarType} type  - constant
 * @return {Object}           - Navbar change Action
 */
export function changeNavbarType(type: NavbarType) {
  return {
    type: CHANGE_NAVBAR,
    navbarType: type
  }
}

/**
 * Stick navbar action. Tells the store that the navbar should now be
 * stuck to the TOP of the page (not fixed)
 * @type {Object}
 */
export const stickNavbar = {
  type: STICK_NAVBAR
}

/**
 * Stick navbar action. Tells the store that the navbar should now stay with
 * the users scrolling (fixed)
 * @type {Object}
 */
export const unstickNavbar = {
  type: UNSTICK_NAVBAR
}

/**
 * Action creator to toggle the mobile nav
 * @param  {Boolean} open   - Optional state to toggle the nav to
 * @return {Object}         - Toggle Action
 */
export function toggleMobileNav(open: boolean) {
  return {
    type: TOGGLE_MOBILE_NAV,
    open
  }
}

/**
 * Scrolled action creator
 * Dispatches the stick or unstick navbar actions depending on if the user
 * has just scroll OFF or TO the top of the page
 * @param  {Number} topOffset   - Current scroll offset
 * @return {Function}           - Redux thunk action
 */
export function scrolled(topOffset: number) {
  return (dispatch, getState) => {
    if (topOffset === 0 && getState().global.offTop) {
      dispatch(stickNavbar);
    } else if (topOffset !== 0 && !getState().global.offTop) {
      dispatch(unstickNavbar);
    }
  }
}

/**
 * Action creator to open a specific modal
 * @param  {String} modal   - Modals constant
 * @return {Object}         - Action
 */
export function openModal(modal: Modals) {
  return {
    type: OPEN_MODAL,
    modal
  }
}

/**
 * Action creator to close a specific modal, only dispatches close Action
 * if relevant modal is open
 * @param  {String} modal   - Modals constant
 * @return {Function}       - Redux thunk action
 */
export function closeModal(modal: Modals) {
  return (dispatch, getState) => {
    if (getState().global.openModal === modal) {
      dispatch({
        type: CLOSE_MODAL
      });
    }
  }
}
