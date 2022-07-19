import React from 'react';
import './Modal.module.scss';

function Modal({ open, close, children }) {
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <button className="close" onClick={close}>
            &items;
          </button>
          {children}
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
