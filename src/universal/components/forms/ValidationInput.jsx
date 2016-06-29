import React from 'react';
import classnames from 'classnames';

const ValidationInputComponent = ({ name, type, inputData, inputClass }) => {
  const hasError = inputData.error && inputData.visited && !inputData.active;

  const inputClasses = classnames(
    inputClass,
    'form-control form-control-lg'
  );
  const labelClasses = classnames(
    'small-caps small text-muted',
    { 'text-danger': hasError }
  );
  const wrapperClasses = classnames(
    'field-group m-b-md',
    { 'is-active': inputData.active }
  );

  return (
    <div className={wrapperClasses}>
      <label className={labelClasses}>{name}</label>
      <input
        type={type}
        className={inputClasses}
        {...inputData} />
      {
        hasError && <p className='text-danger m-t-sm'>{inputData.error}</p>
      }
    </div>
  );
}

export default ValidationInputComponent;
