import { changeNavbarType } from '../redux/ducks/global';
import { SOLID, TRANSPARENT } from '../constants/NavbarTypes';

export const NavbarSolid = {
  componentWillMount() {
    this.props.dispatch(changeNavbarType(SOLID));
  }
}

export const NavbarTransparent = {
  componentWillMount() {
    this.props.dispatch(changeNavbarType(TRANSPARENT));
  }
}
