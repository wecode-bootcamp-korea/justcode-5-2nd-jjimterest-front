import React from 'react';
import css from './Setting.module.scss';

function Setting() {
  return (
    <div className={css.container}>
      <div className={css.innerContainer}>
        <div className={css.sideBar}>
          <div className={css.sideBarContents}>
            <div>공개 프로필</div>
            <div>계정 관리</div>
          </div>
        </div>
        <div className={css.mainContents}>
          <h1>공개 프로필</h1>
          <div>
            회원님의 프로필을 방문하는 사용자에게 다음 정보가 표시됩니다.
          </div>
          <div className={css.inputContainer}>
            <div>사진</div>
            <div>사진변경</div>
            <div>
              <div>
                <div>이름</div>
                <div>input(이름)</div>
              </div>
              <div>
                <div>성</div>
                <div>input(성)</div>
              </div>
            </div>
            <div>소개</div>
            <div>소개input</div>
            <div>웹사이트</div>
            <div>웹사이트 input</div>
            <div>사용자이름</div>
            <div>사용자이름 input</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
