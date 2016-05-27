import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import RegisterForm from '../forms/RegisterForm';
import Modals from '../../constants/Modals';
import { closeModal } from '../../redux/ducks/global';

@connect(mapStateToProps)
export default class RegisterModal extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <Modal
        onClose={() => dispatch(closeModal(Modals.REGISTER))}
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
