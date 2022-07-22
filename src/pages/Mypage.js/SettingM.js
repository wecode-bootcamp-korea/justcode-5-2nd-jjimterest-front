import React, { useState, useEffect } from 'react';
import css from './SettingM.module.scss';
import styled from 'styled-components';
import Profilefooter from '../../components/Profilefooter/Profilefooter';
import BASE_URL from '../../config';
import Nav from '../../components/Nav/Nav';

function SettingM() {
  const [switchBtn, setSwitchBtn] = useState(true);
  const [email, setEmail] = useState();
  const [prePassword, setPrePassword] = useState();

  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjU4MzY4MzE5fQ.0Z8XRjodmNbm07fjSsAAir14VY255DWt-cXh1FYCy3M';
  useEffect(() => {
    const fetchData = async () => {
      const result = await (
        await fetch(`${BASE_URL}account-settings`, {
          method: 'GET',
          headers: {
            // Authorization: localStorage.getItem('login-token'),
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      setEmail(`${result[0].email}`);
    };
    fetchData();
  }, []);

  const editPassBtn = () => {
    fetch(`${BASE_URL}account-settings`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: localStorage.getItem('login-token'),
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        current_password: prePassword,
        new_password: password,
        confirm_new_password: rePassword,
      }),
    }).then(res => {
      if (res.ok) {
        alert('수정완료!');
      } else {
        alert(
          '비밀번호가 일치하지 않습니다!(영문,숫자,특수기호를 섞어 최소 8자리 이상 입력해주세요!)'
        );
      }
    });
  };

  const inputHandlerE = e => {
    setEmail(e.target.value);
  };
  const inputHandlerPrev = e => {
    setPrePassword(e.target.value);
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
      <Nav></Nav>
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
            <div>이전 비밀번호</div>
            <input
              type="password"
              className={css.rePasswordInput}
              onChange={inputHandlerPrev}
              value={prePassword}
            />
            <div>비밀번호 변경</div>
            <input
              type="password"
              className={css.passwordInput}
              placeholder="최소 8자리이상 입력해주세요."
              onChange={inputHandlerP}
              value={password}
            />
            <div>비밀번호 변경확인</div>
            <input
              type="password"
              className={css.rePasswordInput}
              onChange={inputHandlerR}
              value={rePassword}
            />
            <div>
              {password === rePassword ? (
                <p className={css.correct}>비밀번호가 일치합니다.</p>
              ) : (
                <p className={css.correctX}>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Profilefooter btn={editPassBtn} />
    </div>
  );
}

export default SettingM;
