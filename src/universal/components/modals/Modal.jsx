import React from 'react';
import classnames from 'classnames';

const ModalComponent = ({ title, subtitle, modalClasses, onClose, children }) => (

  <div className={classnames('modal', modalClasses)}>
    <div className="modal-backdrop" onClick={onClose}></div>
    <div className="modal-content">
      <h2 className="modal-header small-caps">{title}</h2>
      {
        subtitle &&
          <h6 className="modal-subtitle">{subtitle}</h6>
      }
      <div className="close" onClick={onClose}>
        <i className="material-icons md-36">close</i>
      </div>
      <div className="modal-body">
        {children}
      </div>
    </div>
  </div>

);

export default ModalComponent;
