import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from './Modal.module.scss';

function Modal({ className, visible, children, onClose }) {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner">
          {children}
          {/* 맵돌리기 */}
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;
const CloseButton = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
  font-size: 40px;
  color: #767676;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default Modal;
