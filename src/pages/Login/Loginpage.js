import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import NavBarLogin from '../../components/NavBarLogin';
import Modal from '../../components/Modal/Modal';
import LoginIntroduce from './Introduce';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

const Loginpage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [changeForm, setChangeForm] = useState('signIn');
  const [isPageScrolledDown, setIsPageScrolledDown] = useState(false);
  const [isMouseScrollActive, setIsMouseScrollActive] = useState(false);
  const [bodyScrollOption, setBodyScrollOption] = useState('hidden');
  // const pageFooterRef = useRef();

  const openModal = e => {
    if (e.target.name === 'signIn') {
      setChangeForm('signIn');
    } else {
      setChangeForm('signUp');
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const transForm = () => {
    setChangeForm('signUp');
  };

  const changeBodyScroll = () => {
    setBodyScrollOption(modalOpen ? 'hidden' : 'unset');
    setBodyScrollOption(modalOpen ? 'hidden' : 'unset');
    document.body.style.overflow = bodyScrollOption;
  };

  return (
    <LoginPageContainer>
      <NavBarLogin />
      <PageShadow
        isSignUpModalOpened={modalOpen}
        isLoginModalOpened={modalOpen}
        isPageScrolledDown={isPageScrolledDown}
      />
      <LoginIntroduce />
      <WelcomeText isPageScrolledDown={isPageScrolledDown}>
        가입하여 더 많은 아이디어를 만나보세요
      </WelcomeText>

      <ModalContainer>
        <Modal open={modalOpen} close={closeModal}>
          {changeForm === 'signIn' && <LoginModal change={transForm} />}
          {changeForm === 'signUp' && <SignUpModal />}
        </Modal>
      </ModalContainer>
    </LoginPageContainer>
  );
};

export default Loginpage;

const LoginPageContainer = styled.div``;

const PageShadow = styled.div`
  postion: absolute;
  display: ${props => (props.isSignUpModalOpened ? 'block' : 'none')};
  width: 100%;
  height: 1607px;
  background-color: black;
  opacity: ${props => (props.isSignUpModalOpened ? 0.5 : 0)};
`;

const WelcomeText = styled.div``;

const ModalContainer = styled.div``;
