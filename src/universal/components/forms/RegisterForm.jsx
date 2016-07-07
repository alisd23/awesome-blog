import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import ValidationInput from './ValidationInput';
import Modals from '../modals/ModalTypes';
import validate from './validate';
import { openModal } from '../../redux/ducks/global';
import { register } from '../../redux/ducks/auth';
import LoadingButton from './LoadingButton';
import FormErrors from './FormErrors';
import { registerConstraints } from '../../validation/auth';

const validateForm = (values) => {
  const [firstname] = (values.name || '').split(' ');
  return validate({ ...values, firstname }, registerConstraints.client);
};

const formData = {
  form: 'register',
  fields: ['name', 'username', 'password'],
  validate: validateForm
}

const mapDispatchToProps = { openModal };

@reduxForm(formData, null, mapDispatchToProps)
export default class RegisterForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    openModal: React.PropTypes.func,
    submitting: React.PropTypes.bool
  };

  render() {
    const {
      fields: { name, username, password },
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
      <form onSubmit={handleSubmit(register)}>

        <ValidationInput
          name='Name'
          inputData={name} />

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
          text='Sign up'
        />

        <span>
          <span>Already have an Awesome Blog account?</span>
          <a
            onClick={() => openModal(Modals.LOGIN)}
            className='link-accent strong m-l-d'>Login here</a>
        </span>

      </form>
    );
  }
}
