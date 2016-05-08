import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import localConfig from '../../../server/local.config';
import ValidationInput from '../../components/forms/ValidationInput';
import Modals from '../../constants/Modals';
import { openModal } from '../../redux/ducks/global';

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

@reduxForm(formData)
export default class LoginForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    submitting: React.PropTypes.bool
  };

  render() {
    const {
      fields: { username, password },
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
          LOGIN
        </button>

        <span>
          <span>Don't have an Awesome Blog account?</span>
          <a
            onClick={() => dispatch(openModal(Modals.LOGIN))}
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
