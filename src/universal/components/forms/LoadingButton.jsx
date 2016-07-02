import React from 'react';
import classnames from 'classnames';

export default ({ text, isLoading, className }) => {
  const buttonClasses = classnames(
    className,
    'loading-button',
    { 'is-loading': isLoading }
  );

  return (
    <button
      disabled={isLoading}
      className={buttonClasses}
      type='submit'>
      <span className='loader'><i className='spinner spinner-sm'></i></span>
      <span className='text'>{text}</span>
    </button>
  );
}
