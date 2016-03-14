import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import localConfig from '../../../server/local.config';
import ValidationInput from '../../components/forms/ValidationInput';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email Required';
  }

  if (!values.password) {
    errors.password = 'Password required';
  }
  return errors;
};

const formData = {
  form: 'login',
  fields: ['email', 'password'],
  validate
}

@reduxForm(formData)
export default class LoginForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    submitting: React.PropTypes.bool
  };

  render() {
    const {
      fields: { email, password },
      handleSubmit,
      error,
      submitting
    } = this.props;

    const buttonClasses = classnames(
      { 'loading': submitting },
      "btn btn-caps btn-block btn-lg btn-primary-outline m-t-lg m-b-md"
    );

    return (
      <form onSubmit={handleSubmit}>

        <ValidationInput
          name='Email'
          type='email'
          inputData={email} />

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
          LOGIN
        </button>

        <span>
          <span>Don't have a Fruks account?</span>
          <a
            href={`${localConfig.fruks_web_hostname}/register`}
            className="link-accent strong m-l-d">Sign up here</a>
        </span>

      </form>
    );
  }
}


// VALIDATION
//

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {

  });
};
