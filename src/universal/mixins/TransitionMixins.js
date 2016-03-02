
import classnames from 'classnames';

export const ScaleInMixin = {
  state: {
    in: false
  },
  componentWillAppear(appeared) {
    this.setState({ in: true });
  },
  getClasses(classes) {
    return classnames(classes, 'scale-in', this.state.in ? 'in' : '')
  }
}
