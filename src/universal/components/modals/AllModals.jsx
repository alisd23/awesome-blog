import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Modals from './ModalTypes';

@connect(mapStateToProps)
export default class ModalsContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    openModal: React.PropTypes.string
  }

  render() {
    const { openModal, user } = this.props;

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
                  return !user && <LoginModal />;
                case Modals.REGISTER:
                  return !user && <RegisterModal />;
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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    openModal: state.global.openModal
  }
}
