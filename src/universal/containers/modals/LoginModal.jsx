import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import LoginForm from '../forms/LoginForm';
import Modals from '../../constants/Modals';
import { closeModal } from '../../redux/ducks/global';
import { login } from '../../redux/ducks/auth';

@connect(mapStateToProps)
export default class LoginModal extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <Modal
        onClose={() => dispatch(closeModal(Modals.LOGIN))}
        title="Login"
        subtitle="Login with your blog account"
        modalClasses="login-modal"
      >
        <LoginForm onSubmit={login} />
      </Modal>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {}
}
