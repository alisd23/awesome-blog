import React from 'react';
import classnames from 'classnames';

export default ({ text, isLoading, buttonClassName, className }) => {
  const wrapperClasses = classnames(
    className,
    'loading-button',
    { 'is-loading': isLoading }
  );

  return (
    <div className={wrapperClasses}>
      <button
        className={buttonClassName}
        type='submit'>
        {text}
      </button>
    </div>
  );
}
