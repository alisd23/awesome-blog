import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import Modals from '../../constants/Modals';
import { closeModal } from '../../redux/ducks/global';
import { addFunds } from '../../redux/ducks/auth';

@connect(mapStateToProps)
export default class LoginModal extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <Modal
        onClose={() => dispatch(closeModal(Modals.LOGIN))}
        title="Login"
        modalClasses="login-modal"
      >
        {/*<LoginForm onSubmit={(amount) => this.props.addFunds(amount)} />*/}
      </Modal>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {}
}
