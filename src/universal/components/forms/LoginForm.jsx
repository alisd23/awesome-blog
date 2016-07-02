import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import validate from './validate';
import ValidationInput from './ValidationInput';
import Modals from '../modals/ModalTypes';
import { openModal } from '../../redux/ducks/global';
import { login } from '../../redux/ducks/auth';
import LoadingButton from './LoadingButton';
import FormErrors from './FormErrors';
import { loginConstraints } from '../../validation/auth';

const validateForm = (values) => {
  return validate(values, loginConstraints.client);
};

const formData = {
  form: 'login',
  fields: ['username', 'password'],
  validate: validateForm
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

        <FormErrors errors={error} />

        <LoadingButton
          className={buttonClasses}
          isLoading={submitting}
          text='Login'
        />

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
