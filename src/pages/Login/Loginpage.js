import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import Introduce from './Introduce';
import ImagesContainer from './ImgaesContainer';

const LoginPage = () => {
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [isSignUpModalOpened, setIsSignUpModalOpened] = useState(false);
  const [isPageScrolledDown, setIsPageScrolledDown] = useState(false);
  const [isMouseScrollActive, setIsMouseScrollActive] = useState(false);
  const [bodyScrollOption, setBodyScrollOption] = useState('hidden');
  const [imageMockData, setImageMockData] = useState([]);
  const pageHeaderRef = useRef();
  const pageFooterRef = useRef();

  useEffect(() => {
    fetch('/data/LoginImages.json')
      .then(res => res.json())
      .then(data => {
        setImageMockData(data);
      });
  }, []);

  useEffect(() => {
    if (isMouseScrollActive) {
      setTimeout(function () {
        setIsMouseScrollActive(false);
      }, 1000);
    }
  }, [isMouseScrollActive]);

  const controlLoginModal = () => {
    setIsLoginModalOpened(!isLoginModalOpened);
  };

  const controlSignUpModal = () => {
    setIsSignUpModalOpened(!isSignUpModalOpened);
  };

  const onClick = () => {
    alert('Someday, coming soon');
  };

  const changeBodyScroll = () => {
    setBodyScrollOption(isLoginModalOpened ? 'hidden' : 'unset');
    setBodyScrollOption(isSignUpModalOpened ? 'hidden' : 'unset');
    document.body.style.overflow = bodyScrollOption;
  };

  const goToPagePosition = position => {
    position.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const controllPageDirection = () => {
    setIsPageScrolledDown(!isPageScrolledDown);
  };

  const totalScrollEvent = () => {
    setIsMouseScrollActive(!isMouseScrollActive);
    setIsLoginModalOpened(!isLoginModalOpened);
    setIsSignUpModalOpened(!isSignUpModalOpened);
    changeBodyScroll();
    controllPageDirection();
  };

  const wheelGoToPagePosition = e => {
    if (isLoginModalOpened && !isPageScrolledDown) {
      return;
    } else if (isMouseScrollActive) {
      return;
    } else if (!isPageScrolledDown) {
      totalScrollEvent();
      goToPagePosition(pageFooterRef);
    } else if (isPageScrolledDown) {
      totalScrollEvent();
      goToPagePosition(pageHeaderRef);
    }
  };

  return (
    <EntryPageContainer onWheel={wheelGoToPagePosition}>
      <PageShadow
        isLoginModalOpened={isLoginModalOpened}
        isSignUpModalOpened={isSignUpModalOpened}
        isPageScrolledDown={isPageScrolledDown}
      />
      <SignUpModal
        isPageScrolledDown={isPageScrolledDown}
        isSignUpModalOpened={isSignUpModalOpened}
        controlSignUpModal={controlSignUpModal}
        changeBodyScroll={changeBodyScroll}
      />
      <LoginModal
        isPageScrolledDown={isPageScrolledDown}
        isLoginModalOpened={isLoginModalOpened}
        controlLoginModal={controlLoginModal}
        changeBodyScroll={changeBodyScroll}
      />
      <DownButton
        src="/images/downbutton.png"
        alt="button"
        onClick={() => {
          goToPagePosition(pageFooterRef);
          totalScrollEvent();
        }}
        isPageScrolledDown={isPageScrolledDown}
        isLoginModalOpened={isLoginModalOpened}
      />
      <UpButton
        src="/images/upbutton.png"
        alt="button"
        onClick={() => {
          goToPagePosition(pageHeaderRef);
          totalScrollEvent();
        }}
        isPageScrolledDown={isPageScrolledDown}
        isLoginModalOpened={isLoginModalOpened}
      />
      <WelcomeText isPageScrolledDown={isPageScrolledDown}>
        가입하여 더 많은 아이디어
        <p style={{ marginTop: '20px' }}>를 만나보세요</p>
      </WelcomeText>
      <LoginHeader ref={pageHeaderRef}>
        <Logo>
          <JJimterestLogo
            alt="찜터레스트 로고"
            src="/images/JJimterestLogo.jpg"
          />
          <Pinterest>JJimterest</Pinterest>
        </Logo>
        <RigthContainer>
          <Introduces>
            <Introduced onClick={onClick}>소개</Introduced>
            <Introduced onClick={onClick}>비지니스</Introduced>
            <Introduced onClick={onClick}>언론</Introduced>
          </Introduces>
          <Forms>
            <LoginButton
              type="button"
              onClick={() => {
                controlLoginModal();
                changeBodyScroll();
              }}
            >
              로그인
            </LoginButton>
            <SignUpButton
              type="button"
              onClick={() => {
                controlSignUpModal();
                changeBodyScroll();
              }}
            >
              가입하기
            </SignUpButton>
          </Forms>
        </RigthContainer>
      </LoginHeader>
      <Introduce />
      {imageMockData && <ImagesContainer imageMockData={imageMockData} />}
      <PageFooter ref={pageFooterRef} />
    </EntryPageContainer>
  );
};

export default LoginPage;

const flex = css`
  display: flex;
  align-items: center;
`;

const JJimterestLogo = styled.img`
  width: 30px;
  height: 30px;
`;

const EntryPageContainer = styled.div``;

const PageShadow = styled.div`
  position: absolute;
  display: ${props =>
    props.isLoginModalOpened && props.isSignUpModalOpened ? 'block' : 'none'};
  // display: ${props => (props.isSignUpModalOpened ? 'block' : 'none')};
  width: 100%;
  height: 1607px;
  background-color: black;
  opacity: ${props => (props.isLoginModalOpened ? 0.5 : 0)};
  // opacity: ${props => (props.isSignUpModalOpened ? 0.5 : 0)};
`;

const DownButton = styled.img`
  display: ${props =>
    props.isPageScrolledDown || props.isLoginModalOpened ? 'none' : 'inline'};
  position: absolute;
  right: 50%;
  bottom: 30px;
  width: 50px;
  height: 50px;
  color: red;
  transform: translateX(15px);
  cursor: pointer;
`;

const UpButton = styled(DownButton)`
  display: ${props => (props.isPageScrolledDown ? 'inline' : 'none')};
  bottom: -50px;
`;

const WelcomeText = styled.div`
  display: ${props => (props.isPageScrolledDown ? 'block' : 'none')};
  position: absolute;
  bottom: -200px;
  margin-left: 60px;
  color: white;
  font-size: 60px;
  font-weight: bolder;
`;

const LoginHeader = styled.header`
  ${flex}
  justify-content: space-between;
  padding: 20px;
`;

const Logo = styled.div`
  ${flex}
`;

const Pinterest = styled.span`
  margin-left: 7px;
  color: red;
  font-weight: bolder;
  font-size: 22px;
`;

const RigthContainer = styled.div`
  display: flex;
`;

const Introduces = styled.div`
  ${flex}
  margin-right: 50px;
  color: ${props => props.theme.fontColor};
`;

const Introduced = styled.span`
  margin-right: 20px;
  font-size: 18px;
  font-weight: bloder;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Forms = styled.form`
  ${flex}
`;

const LoginButton = styled.button`
  padding: 5px;
  background-color: ${props => props.theme.red};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: rgb(172, 8, 28);
  }
`;

const SignUpButton = styled(LoginButton)`
  margin-left: 20px;
  background-color: rgba(239, 239, 239, 0.5);
  color: lightgray;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

const bounce1 = keyframes`
  0% {bottom: 18px}
  50% {bottom: 20px}
  100% { bottom: 18px}
`;

const PageFooter = styled.div``;
