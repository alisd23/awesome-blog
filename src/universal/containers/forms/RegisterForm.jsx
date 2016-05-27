import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import ValidationInput from '../../components/forms/ValidationInput';
import Modals from '../../constants/Modals';
import { openModal } from '../../redux/ducks/global';
import { register } from '../../redux/ducks/auth';

const validate = (values) => {
  const errors = {};
  if (!values.name)
    errors.name = 'Name required';
  if (!values.username)
    errors.username = 'Username Required';
  if (!values.password)
    errors.password = 'Password required';
  return errors;
};

const formData = {
  form: 'register',
  fields: ['name', 'username', 'password'],
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
      submitting,
      dispatch
    } = this.props;

    const buttonClasses = classnames(
      { 'loading': submitting },
      "btn btn-caps btn-block btn-lg btn-primary-outline m-t-lg m-b-md"
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

        {
          error &&
            <div className="alert alert-danger">{error}</div>
        }

        <button
          className={buttonClasses}
          type="submit">
          Sign up
        </button>

        <span>
          <span>Already have an Awesome Blog account?</span>
          <a
            onClick={() => dispatch(openModal(Modals.LOGIN))}
            className="link-accent strong m-l-d">Login here</a>
        </span>

      </form>
    );
  }
}
