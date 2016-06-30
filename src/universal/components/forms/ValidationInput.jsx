import React from 'react';
import classnames from 'classnames';

const ValidationInputComponent = ({ name, type, inputData, inputClass }) => {
  const hasError = inputData.error;
  const showErrorMessage = hasError && inputData.visited && !inputData.active;

  const inputClasses = classnames(
    inputClass,
    'form-control form-control-lg'
  );
  const inputWrapperClasses = classnames(
    'validation-input',
    { 'has-error': hasError },
  );
  const labelClasses = classnames(
    'small-caps small text-muted',
    { 'text-danger': showErrorMessage }
  );
  const wrapperClasses = classnames(
    'field-group m-b-md',
    { 'is-active': inputData.active }
  );

  return (
    <div className={wrapperClasses}>
      <div className='input-header'>
        <label className={labelClasses}>{name}</label>
        {
          showErrorMessage && <span className='text-danger'>{inputData.error}</span>
        }
      </div>

      <div className={inputWrapperClasses}>
        <input
          type={type}
          className={inputClasses}
          {...inputData}
        />
        <div className='validation-input-success'>
          <i className="material-icons">check</i>
        </div>
      </div>
    </div>
  );
}

export default ValidationInputComponent;
