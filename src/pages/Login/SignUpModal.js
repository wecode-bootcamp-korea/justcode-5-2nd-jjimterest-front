import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { KAKAO_AUTH_URL } from './OAuth';
import { BASE_URL } from './../../config';

function SignUpModal({
  isSignUpModalOpened,
  controlSignUpModal,
  isPageScrolledDown,
  changeBodyScroll,
}) {
  const [emailValue, setEmailValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [isFormVisibility, setIsFormVisibility] = useState(false);
  const [isEmailVisibility, setIsEmailVisibility] = useState(false);

  const handleEmailInput = e => {
    setEmailValue(e.target.value);
  };

  const handlePwInput = e => {
    setPwValue(e.target.value);
  };

  const navigate = useNavigate();

  const regexId =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regexPw =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

  const goToList = () => {
    navigate('/'); //관심리스트 뽑는 곳
  };

  const signUpLogic = () => {
    if (regexId.test(emailValue) && regexPw.test(pwValue)) {
      fetch(`http://localhost:10010/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          email: emailValue,
          password: pwValue,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'KEY_ERROR') {
            setIsFormVisibility(true);
            setIsEmailVisibility(false);
          } else if (data.message === 'EXISTED_USER') {
            setIsEmailVisibility(true);
            setIsFormVisibility(false);
          } else {
            alert('JJimterest에 오신 것을 환엽합니다!');
            goToList();
            sessionStorage.setItem('token', data.token);
          }
        })
        //여기는 회원가입 후 나오는 보드 페치url
        .then(() => {
          fetch(``, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: sessionStorage.getItem('token'),
            },
            mode: 'cors',
            body: JSON.stringify({}),
          });
        });
    } else {
      setIsFormVisibility(true);
      setIsEmailVisibility(false);
    }
  };

  return (
    <Modal
      isSignUpModalOpened={isSignUpModalOpened}
      isPageScrolledDown={isPageScrolledDown}
    >
      <CloseButton
        src="/images/closebutton.png"
        alt="closebutton"
        isPageScrolledDown={isPageScrolledDown}
        onClick={() => {
          controlSignUpModal();
          changeBodyScroll();
        }}
      />
      <JJimterestLogo alt="찜터레스트 로고" src="/images/JJimterestLogo.jpg" />
      <Welcome>JJimterest에 오신 것을 환영합니다</Welcome>
      <Form>
        <IdContainer>
          <IdInput
            type="text"
            placeholder="이메일"
            value={emailValue}
            onChange={handleEmailInput}
          />
        </IdContainer>
        <PwContainer>
          <PwInput
            type="password"
            placeholder="비밀번호"
            value={pwValue}
            onChange={handlePwInput}
          />
        </PwContainer>
        <AlertFormContainer
          style={{ visibility: isFormVisibility ? 'visible' : 'hidden' }}
        >
          <div>올바른 이메일 형식이 아닙니다.</div>
        </AlertFormContainer>
        <AlertEmailContainer
          style={{ visibility: isEmailVisibility ? 'visible' : 'hidden' }}
        >
          <div>기존에 가입하신 계정이 존재합니다!</div>
        </AlertEmailContainer>
        <Buttons>
          <DefaultLogin>
            <LoginDefault type="button" onClick={signUpLogic}>
              일반 회원 가입 하기
            </LoginDefault>
          </DefaultLogin>
          <SocialLoginWrapper>
            <KakaoLogin type="button">
              <a href={KAKAO_AUTH_URL}>카카오로 시작하기</a>
            </KakaoLogin>
          </SocialLoginWrapper>
        </Buttons>
      </Form>
      <ServiceInfo>
        계속 진행하면 Pinterest 서비스 약관에 동의하고 개인정보 보호정책을
        읽었음을 인정하는 것으로 간주됩니다.
      </ServiceInfo>
    </Modal>
  );
}

const Modal = styled.div`
  display: ${props => (props.isSignUpModalOpened ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px 50px 0;
  width: 500px;
  background-color: white;
  border-radius: 20px;
  transform: ${props =>
    props.isPageScrolledDown
      ? 'translate(30%, 450px)'
      : 'translate(-50%, -50%)'};
  z-index: 1000;
`;

const CloseButton = styled.img`
  display: ${props => (props.isPageScrolledDown ? 'none' : 'inline')};
  position: absolute;
  top: 30px;
  right: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgb(204, 204, 204);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const IdContainer = styled.div`
  margin-top: 20px;
`;

const IdInput = styled.input`
  padding-left: 20px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
`;

const PwContainer = styled.div`
  margin-top: 10px;
`;

const PwInput = styled.input`
  padding-left: 20px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
`;

const AlertFormContainer = styled.section`
  margin-top: 10px;
  color: rgb(250, 128, 114);
`;

const AlertEmailContainer = styled.section`
  margin-top: 10px;
  color: rgb(250, 128, 114);
`;

const Buttons = styled.div``;
const KakaoLogin = styled.button`
  margin-top: 20px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  background-color: yellow;
  height: 30px;
  width: 250px;
  border-width: 2px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const LoginDefault = styled.button`
  margin-top: 10px;
  border: 1px solid rgb(221 221 221);
  border-radius: 16px;
  height: 30px;
  width: 250px;
  border-width: 2px;
  background-color: gry;
`;

const SocialLoginWrapper = styled.div`
  a {
    all: unset;
  }
`;

const JJimterestLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 5px;
`;

const Welcome = styled.span`
  margin: 20px 0;
  font-size: 40px;
  text-align: center;
`;

const DefaultLogin = styled.div``;

const ServiceInfo = styled.span`
  padding: 20px 60px;
  color: rgb(204, 204, 204);
  font-size: 15px;
`;

export default SignUpModal;
