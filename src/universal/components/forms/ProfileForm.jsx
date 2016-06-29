import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import ValidationInput from './ValidationInput';
import { updateProfile } from '../../redux/ducks/auth';

const validate = (values) => {
  const errors = {};
  if (!values.name)
    errors.name = 'Name required';
  if (!values.username)
    errors.username = 'Username Required';
  return errors;
};

const formData = {
  form: 'update-profile',
  fields: ['name', 'username'],
  validate
}

@reduxForm(formData)
export default class RegisterForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    submitting: React.PropTypes.bool
  };

  render() {
    const {
      fields: { name, username, password },
      handleSubmit,
      error,
      submitting
    } = this.props;

    const buttonClasses = classnames(
      { 'loading': submitting },
      'btn btn-caps btn-block btn-lg btn-primary-outline m-t-lg m-b-md'
    );

    return (
      <form onSubmit={handleSubmit(updateProfile)}>
        <ValidationInput
          name='Name'
          inputData={name} />

        <ValidationInput
          name='Username'
          inputData={username} />

        {
          error &&
            <div className='alert alert-danger'>{error}</div>
        }

        <button
          className={buttonClasses}
          type='submit'>
          Update Profile
        </button>
      </form>
    );
  }
}
