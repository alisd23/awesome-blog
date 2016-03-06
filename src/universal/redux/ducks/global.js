import { UPDATE_LOCATION } from 'react-router-redux';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';

const CHANGE_NAVBAR = 'CHANGE_NAVBAR';
const STICK_NAVBAR = 'STICK_NAVBAR';
const UNSTICK_NAVBAR = 'UNSTICK_NAVBAR';
const TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV';

/**
 * [initialState description]
 * @type {Object} - State
 *       - navbarType:    Defines the style foe the navbar
 *       - offTop:        True if user is NOT at the top of the page
 */
const initialState = {
  navbarType: SOLID,
  offTop: false,
  mobileNavOpen: false
}

//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state = initialState, action) {
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
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function changeNavbarType(type: NavbarType) {
  return {
    type: CHANGE_NAVBAR,
    navbarType: type
  }
}

// Navbar affix functionality actions
export const stickNavbar = {
  type: STICK_NAVBAR
}
export const unstickNavbar = {
  type: UNSTICK_NAVBAR
}

// Mobile navigation controls
export function toggleMobileNav(open: boolean) {
  return {
    type: TOGGLE_MOBILE_NAV,
    open
  }
}

export function scrolled(topOffset: number) {
  return (dispatch, getState) => {
    if (topOffset === 0 && getState().global.offTop) {
      dispatch(stickNavbar);
    } else if (topOffset !== 0 && !getState().global.offTop) {
      dispatch(unstickNavbar);
    }
  }
}
