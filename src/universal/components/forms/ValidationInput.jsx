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

  return (
    <div className="field-group m-b-md">
      <label className={labelClasses}>{name}</label>
      <input
        type={type}
        className={inputClasses}
        {...inputData} />
      {
        hasError && <p className="text-danger m-t-sm">{inputData.error}</p>
      }
    </div>
  );
}

export default ValidationInputComponent;
