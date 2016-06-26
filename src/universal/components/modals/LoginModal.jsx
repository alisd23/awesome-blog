import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import LoginForm from '../forms/LoginForm';
import ModalTypes from './ModalTypes';
import { closeModal } from '../../redux/ducks/global';

@connect(mapStateToProps)
export default class LoginModal extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <Modal
        onClose={() => dispatch(closeModal(ModalTypes.LOGIN))}
        title='Login'
        subtitle='Login with your blog account'
        modalClasses='login-modal'
      >
        <LoginForm />
      </Modal>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {}
}
