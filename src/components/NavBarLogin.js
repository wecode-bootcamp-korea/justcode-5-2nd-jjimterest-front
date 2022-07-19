import styled from 'styled-components';
import { useState } from 'react';
import Modal from './Modal/Modal';
import SignUpModal from '../pages/Login/SignUpModal';
import LoginModal from '../pages/Login/LoginModal';

function NavBarLogin() {
  const onClick = () => {
    alert('Someday, coming soon');
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [changeForm, setChangeForm] = useState('signIn');
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

  return (
    <>
      <NavContainer>
        <LogoWrapper>
          <Icon alt="logo" src="" />
          <Title>JJimterest</Title>
        </LogoWrapper>
        <NavWrapper>
          <InfoWrapper>
            <div onClick={onClick}>소개</div>
            <div onClick={onClick}>비즈니스</div>
            <div onCLick={onClick}>언론</div>
          </InfoWrapper>
          <ButtonWrapper>
            <button className="login" name="signIn" onClick={openModal}>
              로그인
            </button>
          </ButtonWrapper>
          <ButtonWrapper>
            <button className="signup" name="signUp" onClick={openModal}>
              가입하기
            </button>
          </ButtonWrapper>
        </NavWrapper>
      </NavContainer>
      <Modal open={modalOpen} close={closeModal}>
        {changeForm === 'signIn' && <LoginModal change={transForm} />}
        {changeForm === 'signUp' && <SignUpModal />}
      </Modal>
    </>
  );
}

export default NavBarLogin;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 990;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: white;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  margin-left: 20px;
  width: 32px;
`;

const Title = styled.span`
  margin-left: 5px;
  font-weight: 700;
  font-size: 21px;
  color: red;
`;

const NavWrapper = styled.div`
  display: flex;
  margin-right: 24px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  font-size: 16px;
  font-weight: 700;

  div {
    margin: 16px;
    padding-top: 5px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  margin: 8px;

  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 17px;
    padding: 11px 12px 11px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    cursoer: pointer;
  }

  .login {
    background-color: red;
    color: white;
    transition-property: background-color;
    transition-duration: 85ms;
    transition-timing-function: ease-out;
    transition-delay: 0s;

    &:hover {
      background-color: #05326e;
    }
  }

  .signup {
    background-color: #e2e2e2;
    color: black;
    transition-property: background-color;
    transition-duration: 85ms;
    transition-timing-function: ease-out;
    transition-delay: 0s;

    &:hover {
      background-color: #bdbdbd;
    }
  }
`;
