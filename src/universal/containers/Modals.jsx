import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'

import LoginModal from '../containers/Modals/LoginModal';
import Modals from '../constants/Modals';

@connect()
export default class ModalsContainer extends React.Component {
  static propTypes = {
    openModal: React.PropTypes.string
  }

  render() {
    const { openModal } = this.props;
    console.log(openModal)

    return (
      <div id="modals">
        <ReactCSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500} >
          {
            (() => {
              switch (openModal) {
                case Modals.LOGIN:
                  return <LoginModal />
                default:
                  return null;
              }
            })()
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
