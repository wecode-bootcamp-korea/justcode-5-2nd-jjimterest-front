import React, { useEffect, useState } from 'react';
import css from './Finfeedmodal.module.scss';
import Commentmodal from '../Commentmodal/Commentmodal';
import CommentBtnmodal from '../Commentmodal/CommentBtnmodal';
import BASE_URL from '../../config';

const Finfeedmodal = ({ setFeedOn, element, pinId }) => {
  const myImg = localStorage.getItem('myimg');

  const [onInput, setOnInput] = useState(false);

  const [pinData, setPinData] = useState();

  const commentOn = e => {
    setOnInput(true);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/pins/${pinId[0]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('핀상세', data);
        setPinData(data);
      });
  }, [pinId]);

  const [on, setOn] = useState(false);
  const onToggle = () => {
    setOn(prev => !prev);
  };
  const closePin = () => {
    setFeedOn(false);
    element.scrollIntoView(false);
  };

  const UI = () => {
    if (pinData && pinData[0].comments) {
      return pinData[0].comments.filter(data => data.parent_id === null).length;
    } else {
      return 0;
    }
  };

  return (
    <div className={css.wraper}>
      <div className={css.container}>
        <div className={css.imgWraper}>
          <img
            className={css.feedImg}
            src={BASE_URL + '/' + pinId[1]}
            alt="핀이미지"
          />
        </div>
        <div className={css.messenger}>
          <div className={css.toolbar}>
            <button className={css.boardBtn}>보드를선택하세요</button>
            <button className={css.storeBtn}>저장</button>
            <button className={css.back} onClick={closePin}>
              X
            </button>
          </div>
          <h1 className={css.pinTitle}>
            {pinData !== undefined && pinData[0].title}
          </h1>
          <div className={css.pinAlt}>Alt</div>
          <div className={css.wrapUserContents}>
            <div className={css.userContents}>
              <img
                className={css.userImg}
                src={
                  pinData
                    ? pinData[0].profile_image
                    : 'https://i.pinimg.com/564x/ea/04/39/ea0439877a5f4fa018632bcd6b20b3d6.jpg'
                }
                alt="유저사진"
              />
              <div className={css.userText}>
                <p className={css.userId}>
                  {pinData ? pinData[0].nickname : '익명'}
                </p>
                <p className={css.follow}>{pinData ? pinData[0].count : 0}</p>
              </div>
            </div>
            <button className={css.followBtn}>팔로우</button>
          </div>
          <div className={css.wrapComment}>
            <div className={css.comment}>{`댓글 ${UI()} 개`}</div>
            <button className={css.plusBtn} onClick={onToggle}>
              더보기
            </button>
          </div>
          {on ? <Commentmodal pinData={pinData[0].comments} /> : null}
          <div className={css.commentInputContainer}>
            <img className={css.myImg} src={myImg} alt="이미지" />
            <input
              className={css.commentInput}
              placeholder="댓글 추가"
              onFocus={commentOn}
            />
          </div>
          {onInput ? <CommentBtnmodal setOn={setOnInput} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Finfeedmodal;
