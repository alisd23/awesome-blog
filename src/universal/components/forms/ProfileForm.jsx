import React from 'react';
import classnames from 'classnames';
import validate from './validate';
import { reduxForm } from 'redux-form';
import ValidationInput from './ValidationInput';
import LoadingButton from './LoadingButton';
import FormErrors from './FormErrors';
import { updateProfile, getCurrentUser } from '../../redux/ducks/auth';
import { getFullname } from '../../helpers/user';
import { profileConstraints } from '../../validation/auth';

const validateForm = (values, props) => {
  // HACK - Workaround for redux-form SSR issue
  if (!props.form._initialized)
    return {};

  const [firstname] = values.name.split(' ');
  return validate({ ...values, firstname }, profileConstraints.client);
};

const formData = {
  form: 'update-profile',
  fields: ['name', 'username'],
  validate: validateForm,
}

const mapStateToProps = (state) => {
  const user = getCurrentUser(state);
  return {
    initialValues: {
      username: user.username,
      name: getFullname(user)
    }
  };
};

@reduxForm(formData, mapStateToProps)
export default class ProfileForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    submitting: React.PropTypes.bool
  };

  render() {
    const {
      fields: { name, username },
      handleSubmit,
      error,
      submitting
    } = this.props;

    const buttonClasses = classnames(
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

        <FormErrors errors={error} />

        <LoadingButton
          className={buttonClasses}
          isLoading={submitting}
          text='Update Profile'
        />
      </form>
    );
  }
}
