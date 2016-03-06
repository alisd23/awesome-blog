import { UPDATE_LOCATION } from 'react-router-redux';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';

const CHANGE_NAVBAR = 'CHANGE_NAVBAR';
const STICK_NAVBAR = 'STICK_NAVBAR';
const UNSTICK_NAVBAR = 'UNSTICK_NAVBAR';

/**
 * [initialState description]
 * @type {Object} - State
 *       - navbarType:    Defines the style foe the navbar
 *       - offTop:        True if user is NOT at the top of the page
 */
const initialState = {
  navbarType: SOLID,
  offTop: false
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
export const stickNavbar = {
  type: STICK_NAVBAR
}
export const unstickNavbar = {
  type: UNSTICK_NAVBAR
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
