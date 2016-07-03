import React from 'react';
import classnames from 'classnames';
import { alertClasses } from './AlertTypes';

export default ({ title, content, type, dismissAlert }) => {
  const classes = classnames(
    'alert',
    alertClasses[type]
  );

  return (
    <div
      className={classes}
      onClick={dismissAlert}
    >
      <h5>{title}</h5>
      <p
        className="small"
        dangerouslySetInnerHTML={{ __html: content }}>
      </p>
    </div>
  );
}
