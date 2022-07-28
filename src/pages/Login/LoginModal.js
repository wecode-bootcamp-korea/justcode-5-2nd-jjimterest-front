import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from './OAuth';

const LoginContainer = ({
  isLoginModalOpened,
  controlLoginModal,
  isPageScrolledDown,
  changeBodyScroll,
}) => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [pwValue, setPwValue] = useState('');

  const handleEmailInput = e => {
    setEmailValue(e.target.value);
  };

  const handlePwInput = e => {
    setPwValue(e.target.value);
  };

  const goToList = () => {
    navigate('/main');
  };

  const loginBtnHandle = () => {
    fetch(`http://localhost:10010/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        email: emailValue,
        password: pwValue,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(result => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          alert('로그인이 완료되었습니다');
          goToList('/main');
        } else {
          alert('아이디혹은 비밀번호가 잘못되었습니다');
        }
      });
  };

  return (
    <Modal
      isLoginModalOpened={isLoginModalOpened}
      isPageScrolledDown={isPageScrolledDown}
    >
      <CloseButton
        src="/images/closebutton.png"
        alt="closebutton"
        isPageScrolledDown={isPageScrolledDown}
        onClick={() => {
          controlLoginModal();
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
        <FindPassword>비밀번호를 잊으셨나요?</FindPassword>
        <LoginButton type="button" onClick={loginBtnHandle}>
          로그인
        </LoginButton>
        <OrText>또는</OrText>
        <LoginLink href={KAKAO_AUTH_URL}>
          <KakaoLogin type="button">KaKao로 계속하기</KakaoLogin>
        </LoginLink>
        <KakaoLogout type="button">로그아웃</KakaoLogout>
      </Form>
      <ServiceInfo>
        계속 진행하면 Pinterest 서비스 약관에 동의하고 개인정보 보호정책을
        읽었음을 인정하는 것으로 간주됩니다.
      </ServiceInfo>
    </Modal>
  );
};

export default LoginContainer;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: ${props => (props.isLoginModalOpened ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
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

const FindPassword = styled.span`
  margin-bottom: 20px;
  padding-top: 10px;
`;

const LoginButton = styled.button`
  width: 250px;
  padding: 7px 0;
  border-radius: 15px;
  border: none;
  background-color: red;
  color: white;
  font-size: 20px;
  outline: none;
  cursor: pointer;
`;

const OrText = styled.span`
  margin: 20px 0;
  text-align: center;
`;

const LoginLink = styled.a``;

const KakaoLogin = styled(LoginButton)`
  margin-bottom: 10px;
  background-color: #fee500;
  color: rgb(24, 22, 0);
  cursor: pointer;
`;

const KakaoLogout = styled(LoginButton)`
  margin-bottom: 10px;
  background-color: ${props => props.theme.middleGrey};
  color: white;
`;

const ServiceInfo = styled.span`
  padding: 20px 60px;
  color: rgb(204, 204, 204);
  font-size: 15px;
`;
