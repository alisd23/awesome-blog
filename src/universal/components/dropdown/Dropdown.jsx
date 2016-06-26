import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

export default class Dropdown extends React.Component {
  static propTypes = {
    getTrigger: React.PropTypes.func,
    className: React.PropTypes.string
  }

  state = {
    open: false
  }

  componentDidMount() {
    this.props.getTrigger()
      .addEventListener('click', () => this.toggleDropdown());
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.offClickListener);
  }
  componentDidUpdate() {
    if (this.state.open) {
      // Add click off listener
      document.addEventListener('click', this.offClickListener);
    } else {
      // remove click listener
      document.removeEventListener('click', this.offClickListener);
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName='dropdown'
        transitionEnterTimeout={350}
        transitionLeaveTimeout={350} >
        {
          this.state.open &&
            <div
              ref='menu'
              className={classnames(className, 'dropdown-menu')}
              onClick={() => this.toggleDropdown()}>
              { children }
            </div>
        }
      </ReactCSSTransitionGroup>
    );
  }


  toggleDropdown(state) {
    this.setState({ open: state != null ? state : !this.state.open });
  }
  /**
   * Listens for clicks 'off' the dropdown
   * NOTE - must be arrow function to keep correct 'this' context
   * @param  {event} e  - Click event
   */
  offClickListener = (e) => {
    let level = 0;
    for (var element = e.target; element; element = element.parentNode) {
      if (element === this.refs.menu ||
          element === this.props.getTrigger()) {
        return true;
      }
      level++;
    }
    this.toggleDropdown(false);
  }
}
