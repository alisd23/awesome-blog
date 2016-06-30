import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import ValidationInput from './ValidationInput';
import Modals from '../modals/ModalTypes';
import { openModal } from '../../redux/ducks/global';
import { login } from '../../redux/ducks/auth';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'username Required';
  }

  if (!values.password) {
    errors.password = 'Password required';
  }
  return errors;
};

const formData = {
  form: 'login',
  fields: ['username', 'password'],
  validate
}

const mapDispatchToProps = { openModal };

@reduxForm(formData, null, mapDispatchToProps)
export default class LoginForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    openModal: React.PropTypes.func,
    submitting: React.PropTypes.bool
  };

  render() {
    const {
      fields: { username, password },
      handleSubmit,
      error,
      submitting,
      openModal
    } = this.props;

    const buttonClasses = classnames(
      { 'loading': submitting },
      'btn btn-caps btn-block btn-lg btn-primary-outline m-t-lg m-b-md'
    );

    return (
      <form onSubmit={handleSubmit(login)}>

        <ValidationInput
          name='Username'
          inputData={username} />

        <ValidationInput
          name='Password'
          type='password'
          inputData={password} />

        {
          error &&
            <div className='alert alert-danger'>{error}</div>
        }

        <button
          className={buttonClasses}
          type='submit'>
          LOGIN
        </button>

        <span>
          <span>Don't have an Awesome Blog account?</span>
          <a
            onClick={() => openModal(Modals.REGISTER)}
            className='link-accent strong m-l-d'>Sign up here</a>
        </span>

      </form>
    );
  }
}
