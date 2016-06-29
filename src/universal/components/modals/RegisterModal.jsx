import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import RegisterForm from '../forms/RegisterForm';
import ModalTypes from './ModalTypes';
import { closeModal } from '../../redux/ducks/global';

const mapDispatchToProps = { closeModal };

@connect(null, mapDispatchToProps)
export default class RegisterModal extends React.Component {

  render() {
    const { closeModal } = this.props;
    return (
      <Modal
        onClose={() => closeModal(ModalTypes.REGISTER)}
        title='Sign Up'
        subtitle='Create a blog account'
        modalClasses='register-modal'
      >
        <RegisterForm />
      </Modal>
    );
  }
}
