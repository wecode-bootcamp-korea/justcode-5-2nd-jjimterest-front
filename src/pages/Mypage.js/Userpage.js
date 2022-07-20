import React, { useState, useEffect } from 'react';
import css from './Userpage.module.scss';
import Stored from '../../components/Myprofile/Stored';
import Created from '../../components/Myprofile/Created';
import styled from 'styled-components';
import Modal from '../../components/Myprofile/Modal';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
function Userpage() {
  const [state, setState] = useState(true);
  const [followModal, setFollowModal] = useState(false);
  const params = useParams();
  const { nickname } = params;
  const [userDate, setUserData] = useState();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjU4MTk0OTQzfQ.NCdRjQSoDGLAKuarZU7WTXDWnYWwwc6JLEjoFNEMyM0';
  useEffect(() => {
    fetch(`http://localhost:10010/profile/${nickname}`, {
      method: 'GET',
      headers: {
        // Authorization: localStorage.getItem('access_token'),
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setUserData(res);
      });
  }, [nickname]);

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
  const FollowBtn = styled.button`
    padding: 12px 16px;
    background-color: rgb(230, 9, 26);
    border: none;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    color: white;
    &:hover {
      opacity: 0.8;
    }
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
            <FollowBtn>팔로우</FollowBtn>
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

export default Userpage;
