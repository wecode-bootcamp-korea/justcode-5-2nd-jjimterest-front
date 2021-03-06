import React, { useState, useEffect } from 'react';
import css from './Userpage.module.scss';
import Stored from '../../components/Myprofile/Stored';
import Created from '../../components/Myprofile/Created';
import styled from 'styled-components';
import Modal from '../../components/Myprofile/Modal';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../config';
import FollowContainer from '../../components/FollowContainer/FollowContainer';
import Nav from '../../components/Nav/Nav';
function Userpage() {
  const [state, setState] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const [followerModal, setFollowerModal] = useState(false);
  const params = useParams();
  const { nickname } = params;
  const [userDate, setUserData] = useState();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjU4MzY4MzE5fQ.0Z8XRjodmNbm07fjSsAAir14VY255DWt-cXh1FYCy3M';
  useEffect(() => {
    fetch(`${BASE_URL}profile/${nickname}`, {
      method: 'GET',
      headers: {
        // Authorization: localStorage.getItem('login-token'),
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
  const openFollowerModal = () => {
    setFollowerModal(true);
  };
  const closeFollowerModal = () => {
    setFollowerModal(false);
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
      <Nav />
      <Modal visible={followerModal} onClose={closeFollowerModal}>
        <div className={css.modalHeader}>?????????</div>
        {userDate &&
          userDate.follower.map((data, index) => (
            <FollowContainer
              boardName={data.profile_image}
              userName={data.nickname}
              key={index}
            />
          ))}
      </Modal>
      <Modal visible={followModal} onClose={closeFollowModal}>
        <div className={css.modalHeader}>?????????</div>
        {userDate &&
          userDate.following.map((data, index) => (
            <FollowContainer
              boardName={data.profile_image}
              userName={data.nickname}
              key={index}
            />
          ))}
      </Modal>
      <div className={css.profileWrapper}>
        <div className={css.profileContents}>
          <div className={css.imgWrapper}>
            <img
              src={`${
                userDate &&
                (userDate.profile_image[0] === 'h'
                  ? userDate.profile_image
                  : `${BASE_URL}` + userDate.profile_image)
              }`}
              className={css.mePhoto}
            ></img>
          </div>
          <div className={css.nameWrapper}>
            <div className={css.userName}>{userDate && userDate.name}</div>
            <div className={css.userId}>{userDate && userDate.nickname}</div>
          </div>
          <div className={css.followBox}>
            <div className={css.follow} onClick={openFollowerModal}>
              ????????? {userDate && userDate.follower.length}???
            </div>
            <div className={css.follow} onClick={openFollowModal}>
              ????????? {userDate && userDate.following.length}???
            </div>
          </div>
          <div className={css.profileBtn}>
            <FollowBtn>?????????</FollowBtn>
          </div>
        </div>
      </div>
      <div className={css.boardNav}>
        <div>
          <div className={css.boardNavContents}>
            <Div onClick={goToCreated} isSelected={state}>
              ?????????
            </Div>
            <Divv onClick={goToStored} isSelected={state}>
              ?????????
            </Divv>
          </div>
        </div>
      </div>
      {state ? (
        <Stored
          idea={false}
          navOnOff={false}
          myDate={userDate && userDate.boards}
          myPins={userDate && userDate.no_idea_pins}
          linkNav={true}
          nickname={nickname}
          allPins={userDate && userDate.all_pins}
        />
      ) : (
        <Created myDate={userDate && userDate.my_pins} showBoard={false} />
      )}
    </div>
  );
}

export default Userpage;
