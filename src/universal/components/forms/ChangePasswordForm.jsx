import React from 'react';
import classnames from 'classnames';
import validate from './validate';
import { reduxForm } from 'redux-form';
import ValidationInput from './ValidationInput';
import LoadingButton from './LoadingButton';
import FormErrors from './FormErrors';
import { changePassword } from '../../redux/ducks/auth';
import { changePasswordConstraints } from '../../validation/auth';

const validateForm = (values, props) => {
  return validate(values, changePasswordConstraints);
};

const formData = {
  form: 'change-password',
  fields: ['currentPassword', 'newPassword', 'repeatPassword'],
  validate: validateForm,
}

@reduxForm(formData)
export default class ChangePasswordForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    submitting: React.PropTypes.bool
  };

  render() {
    const {
      fields: { currentPassword, newPassword, repeatPassword },
      handleSubmit,
      error,
      submitting
    } = this.props;

    const buttonClasses = classnames(
      'btn btn-caps btn-block btn-lg btn-primary-outline m-t-lg m-b-md'
    );

    return (
      <form onSubmit={handleSubmit(changePassword)}>
        <ValidationInput
          name='Current Password'
          hideFeedback={true}
          type='password'
          inputData={currentPassword} />

        <ValidationInput
          name='New Password'
          type='password'
          inputData={newPassword} />

        <ValidationInput
          name='Repeat Password'
          type='password'
          inputData={repeatPassword} />

        <FormErrors errors={error} />

        <LoadingButton
          className={buttonClasses}
          isLoading={submitting}
          text='Change Password'
        />
      </form>
    );
  }
}
