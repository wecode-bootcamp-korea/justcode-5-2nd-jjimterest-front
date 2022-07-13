import React, { useState } from 'react';
import css from './Mypage.module.scss';
import Stored from '../../components/Myprofile/Stored';
import Created from '../../components/Myprofile/Created';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from '../../components/Myprofile/Modal';
function Mypage() {
  const [state, setState] = useState(true);
  const [followModal, setFollowModal] = useState(false);

  const openFollowModal = () => {
    setFollowModal(true);
  };
  const closeFollowModal = () => {
    setFollowModal(false);
  };

  const goToCreated = () => {
    setState(false);
  };
  const goToStored = () => {
    setState(true);
  };
  const Div = styled.div`
    padding: 8px;
    font-weight: 700;
    margin: 10px;
    border-bottom: ${state ? 'none' : 'solid black 4px'};
    ${state
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
    border-bottom: ${state ? 'solid black 4px' : 'none'};
    ${state
      ? ''
      : ` &:hover {
      cursor: pointer;
      border-radius: 5px;
      background-color: #efefef;
    }`}
  `;

  return (
    <div className={css.container}>
      <Modal visible={followModal} onClose={closeFollowModal}>
        <div className={css.modalHeader}>팔로잉</div>
      </Modal>
      <div className={css.profileWrapper}>
        <div className={css.profileContents}>
          <div className={css.imgWrapper}>
            <img
              src={`${process.env.PUBLIC_URL}/images/KakaoTalk_Photo_2022-07-12-14-22-49.jpeg`}
              className={css.mePhoto}
            ></img>
          </div>
          <div className={css.nameWrapper}>
            <div className={css.userName}>정상현</div>
            <div className={css.userId}>@jkn17083</div>
          </div>
          <div className={css.follow} onClick={openFollowModal}>
            팔로잉 1명
          </div>
          <div className={css.profileBtn}>
            <Link to={`/setting`}>
              <button>프로필 수정</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={css.boardNav}>
        <div>
          <div className={css.boardNavContents}>
            <Div onClick={goToCreated} isSelected={state}>
              생성됨
            </Div>
            <Divv onClick={goToStored} isSelected={state}>
              저장됨
            </Divv>
          </div>
        </div>
      </div>
      {state ? <Stored /> : <Created />}
    </div>
  );
}

export default Mypage;
