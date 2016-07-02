import React from 'react';
import classnames from 'classnames';

export default ({ errors }) => {
  const errorsArray = errors
    ? (Array.isArray(errors) ? errors : [errors])
    : [];

  return (
    errorsArray.length > 0 &&
      <div className='alert alert-danger'>
        {
          errorsArray.map((err, i) =>
            <p key={i}>{err}</p>
          )
        }
      </div>
  );
}
