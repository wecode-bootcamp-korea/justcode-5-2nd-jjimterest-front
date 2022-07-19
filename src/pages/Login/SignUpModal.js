import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './OAuth';

function SignUpModal() {
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

  const navigaet = useNavigate();

  const regexId =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/i;
  const regexPw = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8}/;

  const goToList = () => {
    navigaet('/'); //관심리스트 뽑는 곳
  };

  const signUpLogic = () => {
    if (regexId.test(emailValue) && regexPw.test(pwValue)) {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/signup`, {
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
    <LoginWrapper>
      <LoginForm>
        <HeadingWrapper>
          <Heading1>JJimterest 에 오신 것을</Heading1>
          <Heading2>환영합니다</Heading2>
        </HeadingWrapper>
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
          <div>이메일 형식은 아이디와</div>
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
      </LoginForm>
      <ServiceInfo>
        계속 진행하면 Pinterest 서비스 약관에 동의하고 개인정보 보호정책을
        읽었음을 인정하는 것으로 간주됩니다.
      </ServiceInfo>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: fit-content;
  height: 450px;
  margin: 0 auto;
  margin-top: -65px;
  padding-top: 150px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const LoginForm = styled.form`
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-itmes: center;
  width: 400px;
  padding: 20px 10px 24px;
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

const HeadingWrapper = styled.div`
  margin-top: -20px;
`;

const Heading1 = styled.h2`
  font-size: 30px;
  white-space: nowrap;
`;

const Heading2 = styled.h2`
  font-size: 30px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
`;

const DefaultLogin = styled.div``;

const ServiceInfo = styled.span`
  padding: 20px 60px;
  color: rgb(204, 204, 204);
  font-size: 15px;
`;

export default SignUpModal;
