import React, { Component } from 'react';
import classnames from 'classnames';

export default class Tab extends Component {
  element = null;

  render() {
    const { isActive, title, onClick } = this.props;
    const classes = classnames(
      'slide-tab small-caps',
      { 'is-active': isActive }
    );

    return (
      <div
        className={classes}
        onClick={onClick}
        ref={el => this.element = el}
      >
        {title}
      </div>
    )
  }
}
