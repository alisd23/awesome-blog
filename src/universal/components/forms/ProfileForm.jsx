import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import ValidationInput from './ValidationInput';
import LoadingButton from './LoadingButton';
import { updateProfile, getCurrentUser } from '../../redux/ducks/auth';
import { getFullname } from '../../helpers/user';

const validate = (values, props) => {
  const errors = {};

  // HACK - Workaround for redux-form SSR issue
  if (!props.form._initialized)
    return {};

  if (!values.name)
    errors.name = 'Name required';
  if (!values.username)
    errors.username = 'Username Required';
  return errors;
};

const formData = {
  form: 'update-profile',
  fields: ['name', 'username'],
  validate,
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

        {
          error &&
            <div className='alert alert-danger'>{error}</div>
        }

        <LoadingButton
          buttonClassName={buttonClasses}
          isLoading={submitting}
          text='Update Profile'
        />
      </form>
    );
  }
}
