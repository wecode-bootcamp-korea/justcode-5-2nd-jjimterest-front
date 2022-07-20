import React, { useState } from 'react';
import css from './SettingM.module.scss';
import styled from 'styled-components';
import Profilefooter from '../../components/Profilefooter/Profilefooter';

function SettingM() {
  const [switchBtn, setSwitchBtn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const inputHandlerE = e => {
    setEmail(e.target.value);
  };
  const inputHandlerP = e => {
    setPassword(e.target.value);
  };
  const inputHandlerR = e => {
    setRePassword(e.target.value);
  };

  const goToPublic = () => {
    setSwitchBtn(false);
    window.location.href = `/settings`;
  };
  const goToMan = () => {
    setSwitchBtn(true);
  };

  const Div = styled.div`
    padding: 8px;
    font-weight: 700;
    margin: 10px;
    border-bottom: ${switchBtn ? 'none' : 'solid black 4px'};
    ${switchBtn
      ? `&:hover {
        cursor: pointer;
      border-radius: 5px;
      background-color: #efefef;
    }`
      : ''}
  `;
  const Divv = styled.div`
    padding: 8px;
    font-weight: 700;
    margin: 10px;
    border-bottom: ${switchBtn ? 'solid black 4px' : 'none'};
    ${switchBtn
      ? ''
      : ` &:hover {
      cursor: pointer;
      border-radius: 5px;
      background-color: #efefef;
    }`}
  `;
  return (
    <div className={css.container}>
      <div className={css.innerContainer}>
        <div className={css.sideBar}>
          <div className={css.sideBarContents}>
            <Div onClick={goToPublic} isSelected={switchBtn}>
              공개 프로필
            </Div>
            <Divv onClick={goToMan} isSelected={switchBtn}>
              계정 관리
            </Divv>
          </div>
        </div>
        <div className={css.mainContents}>
          <h1>계정 관리</h1>
          <div>
            이메일, 비밀번호, 계정 유형을 변경하세요. 이 정보는 비공개이며
            회원님의 공개 프로필에 표시되지 않습니다.
          </div>
          <div className={css.inputContainer}>
            <div>이메일 - 비공개</div>
            <input
              className={css.emailInput}
              onChange={inputHandlerE}
              value={email}
            />
            <div>비밀번호 변경</div>
            <input
              className={css.passwordInput}
              placeholder="최소 8자리이상 입력해주세요."
              onChange={inputHandlerP}
              value={password}
            />
            <div>비밀번호 변경확인</div>
            <input
              className={css.rePasswordInput}
              onChange={inputHandlerR}
              value={rePassword}
            />
          </div>
        </div>
      </div>
      <Profilefooter />
    </div>
  );
}

export default SettingM;
