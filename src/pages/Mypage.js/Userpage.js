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
  const [following, setFollowing] = useState();
  console.log(following);

  // useEffect(() => {
  //   fetch(`${BASE_URL}profile/${nickname}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setUserData(res);
  //     });
  // }, [nickname]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(`${BASE_URL}profile/${nickname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUserData(data);
        });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [nickname]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(`${BASE_URL}follow/${userDate.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setFollowing(data.is_follow);
        });
    }, 100);
    return () => {
      clearInterval(timer);
    };
  });

  const onFollowBtn = () => {
    fetch(`${BASE_URL}follow?followee_id=${userDate.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    window.location.reload();
  };

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
    background-color: ${following ? '#e0e0e0' : 'rgb(230, 9, 26)'};
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
        <div className={css.modalHeader}>팔로잉</div>
        {userDate &&
          userDate.follower.map((data, index) => (
            <FollowContainer
              img={data.profile_image}
              userName={data.nickname}
              nName={data.name}
              key={index}
              onClose={closeFollowerModal}
            />
          ))}
      </Modal>
      <Modal visible={followModal} onClose={closeFollowModal}>
        <div className={css.modalHeader}>팔로워</div>
        {userDate &&
          userDate.following.map((data, index) => (
            <FollowContainer
              img={data.profile_image}
              userName={data.nickname}
              nName={data.name}
              key={index}
              onClose={closeFollowModal}
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
              팔로잉 {userDate && userDate.follower.length}명
            </div>
            <div className={css.follow} onClick={openFollowModal}>
              팔로워 {userDate && userDate.following.length}명
            </div>
          </div>
          <div className={css.profileBtn}>
            <FollowBtn onClick={onFollowBtn}>
              {following ? '언팔로우' : '팔로우'}
            </FollowBtn>
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
