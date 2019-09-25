import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import './Modal.css';

/**
 * Displays a modal window
 */
const Modal = ({ title, children, buttons, visible, closable, onCancel, onOk, className, ...otherProps }) => {
  const buttonsContent = buttons !== ''
    ? buttons
    : (
      <>
        <Button onClick={onCancel}>Annuler</Button>
        <Button onClick={onOk} primary>Ok</Button>
      </>
    );

  return (
    <div className={`modal ${visible ? 'active' : ''} ${className}`} {...otherProps}>
        <div className="modal-overlay" onClick={() => closable && onCancel()} />

      <div className="modal-container">
        <div className="modal-title">{title}</div>

        {closable && (
          <div className="modal-close-button" onClick={onCancel}>
            <span />
            <span />
          </div>
        )}
        <div className="modal-body">
          <div className="modal-content">{children}</div>
          { buttonsContent && <div className="modal-buttons">{buttonsContent}</div> }
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  /**
   * Modal window title
   */
  title: PropTypes.node.isRequired,
  /**
   * Modal window content
   */
  children: PropTypes.node.isRequired,
  /**
   * Modal window buttons. The default value is two buttons : "Annuler" and "Ok"
   */
  buttons: PropTypes.node,
  /**
   * Whether the modal window is visible or not
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Whether the modal window is closable or not
   */
  closable: PropTypes.bool,
  /**
   * Function called when the user clicks on "Annuler" default button,
   * or outside the modal, or on the close button
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Function called when the user clicks on "Ok" default button
   */
  onOk: PropTypes.func,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Modal.defaultProps = {
  buttons: '',
  closable: true,
  onOk: () => {},
  className: '',
};

export default Modal;