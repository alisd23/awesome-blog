import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import RegisterForm from '../forms/RegisterForm';
import ModalTypes from './ModalTypes';
import { closeModal } from '../../redux/ducks/global';

@connect(mapStateToProps)
export default class RegisterModal extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <Modal
        onClose={() => dispatch(closeModal(ModalTypes.REGISTER))}
        title="Sign Up"
        subtitle="Create a blog account"
        modalClasses="register-modal"
      >
        <RegisterForm />
      </Modal>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {}
}
