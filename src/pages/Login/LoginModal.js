import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { KAKAO_AUTH_URL } from './OAuth';

const LoginContainer = ({
  isLoginModalOpened,
  controlLoginModal,
  isPageScrolledDown,
  changeBodyScroll,
}) => {
  return (
    <Modal
      isLoginModalOpened={isLoginModalOpened}
      isPageScrolledDown={isPageScrolledDown}
    >
      <AiOutlineClose
        size="20"
        isPageScrolledDown={isPageScrolledDown}
        onClick={() => {
          controlLoginModal();
          changeBodyScroll();
        }}
      />
      <JJimterestLogo alt="찜터레스트 로고" src="" />
      <Welcome>JJimterest에 오신 것을 환영합니다</Welcome>
      <Form>
        <Input disabled={true} placeholder="이메일" />
        <Input disabled={true} placeholder="비밀번호" />
        <FindPassword>비밀번호를 잊으셨나요?</FindPassword>
        <LoginButton disabled>로그인</LoginButton>
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

const JJimterestLogo = styled.img`
  width: 50px;
  height: 50px;
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

const Input = styled.input`
  width: 250px;
  margin-bottom: 10px;
  padding: 5px 0;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 10px;
  font-size: 20px;
  outline: none;

  &::placeholder {
    padding-left: 10px;
    font-size: 15px;
  }
`;

const FindPassword = styled.span`
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  width: 250px;
  padding: 7px 0;
  border-radius: 15px;
  border: none;
  background-color: ${props => props.theme.middleGrey};
  color: rgba(225, 225, 225, 0.25);
  font-size: 20px;
  outline: none;
  cursor: default;
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
  color: rgba(225, 225, 225, 0.25);
`;

const ServiceInfo = styled.span`
  padding: 20px 60px;
  color: rgb(204, 204, 204);
  font-size: 15px;
`;
