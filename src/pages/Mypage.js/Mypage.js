import React, { useState, useEffect } from 'react';
import css from './Mypage.module.scss';
import Stored from '../../components/Myprofile/Stored';
import Created from '../../components/Myprofile/Created';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Modal from '../../components/Myprofile/Modal';
import BASE_URL from '../../config';
import FollowContainer from '../../components/FollowContainer/FollowContainer';
import Nav from '../../components/Nav/Nav';

function Mypage() {
  const [state, setState] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const [followerModal, setFollowerModal] = useState(false);
  //데이터 패치
  const [myDate, setMyData] = useState();
  const location = useLocation();
  const data = location.state.pName;

  useEffect(() => {
    const fetchData = async () => {
      const result = await (
        await fetch(`${BASE_URL}profile/${data[0].name}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
      ).json();
      setMyData(result);
    };
    fetchData();
  }, []);
  console.log(myDate && myDate.name);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     fetch(`${BASE_URL}profile/${data[0].name}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         setMyData(data);
  //       });
  //   }, 100);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

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

  return (
    <div className={css.container}>
      <Nav />
      <Modal visible={followerModal} onClose={closeFollowerModal}>
        <div className={css.modalHeader}>팔로잉</div>
        {myDate &&
          myDate.follower.map((data, index) => (
            <FollowContainer
              img={data.profile_image}
              userName={data.nickname}
              nName={data.name}
              key={index}
            />
          ))}
      </Modal>
      <Modal visible={followModal} onClose={closeFollowModal}>
        <div className={css.modalHeader}>팔로워</div>
        {myDate &&
          myDate.following.map((data, index) => (
            <FollowContainer
              img={data.profile_image}
              userName={data.nickname}
              nName={data.name}
              key={index}
            />
          ))}
      </Modal>
      <div className={css.profileWrapper}>
        <div className={css.profileContents}>
          <div className={css.imgWrapper}>
            <img
              src={`${
                myDate &&
                (myDate.profile_image[0] === 'h'
                  ? myDate.profile_image
                  : `${BASE_URL}` + myDate.profile_image)
              }`}
              className={css.mePhoto}
              alt="이미지 없음"
            ></img>
          </div>
          <div className={css.nameWrapper}>
            <div className={css.userName}>{myDate && myDate.name}</div>
            <div className={css.userId}>{myDate && myDate.nickname}</div>
          </div>
          <div className={css.followBox}>
            <div className={css.follow} onClick={openFollowerModal}>
              팔로잉 {myDate && myDate.follower.length}명
            </div>
            <div className={css.follow} onClick={openFollowModal}>
              팔로워 {myDate && myDate.following.length}명
            </div>
          </div>
          <div className={css.profileBtn}>
            {/* 로그인한 아이디와 들어간 프로필 아이디 비교 로직 추가 */}
            <Link to={`/settings`}>
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
      {state ? (
        <Stored
          idea={true}
          navOnOff={true}
          myDate={myDate && myDate.boards}
          myPins={myDate && myDate.no_idea_pins}
          allPins={myDate && myDate.all_pins}
        />
      ) : (
        <Created myDate={myDate && myDate.my_pins} showBoard={false} />
      )}
    </div>
  );
}

export default Mypage;
