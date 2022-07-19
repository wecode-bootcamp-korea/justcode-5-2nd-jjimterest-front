import React, { useEffect, useState } from 'react';
import css from './Finfeedmodal.module.scss';
import Commentmodal from '../Commentmodal/Commentmodal';
import BASE_URL from '../../config';

const Finfeedmodal = ({ setFeedOn, element, pinId }) => {
  const [pinData, setPinData] = useState({});
  console.log(pinId);
  useEffect(() => {
    fetch(`${BASE_URL}/pins/${pinId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
      },
    })
      .then(res => res.json())
      .then(data => {
        setPinData(data);
      });
  }, []);

  const [on, setOn] = useState(false);
  const onToggle = () => {
    setOn(prev => !prev);
  };
  const closePin = () => {
    setFeedOn(false);
    element.scrollIntoView(false);
  };

  return (
    <div className={css.wraper}>
      <button className={css.back} onClick={closePin}>
        X
      </button>
      <div className={css.container}>
        <img
          className={css.feedImg}
          src="https://i.pinimg.com/474x/92/80/1e/92801e77f628a8536276d943967d7fd5.jpg"
          alt="핀이미지"
        />
        <div className={css.messenger}>
          <div className={css.toolbar}>
            <button className={css.boardBtn}>보드</button>
            <button className={css.storeBtn}>저장</button>
          </div>
          <div className={css.userName}>업로드한 사람 : username</div>
          <div className={css.pinTitle}>타이틀</div>
          <div className={css.pinAlt}>Alt</div>
          <div className={css.wrapUserContents}>
            <div className={css.userContents}>
              <img
                className={css.userImg}
                src="https://i.pinimg.com/474x/a6/66/b2/a666b2f0822587f08168bd9726c51d69.jpg"
                alt="유저사진"
              />
              <div className={css.userText}>
                <p className={css.userId}>userId</p>
                <p className={css.follow}>followcount</p>
              </div>
            </div>
            <button className={css.followBtn}>팔로우</button>
          </div>
          <div className={css.wrapComment}>
            <div className={css.comment}>댓글 ?개</div>
            <button className={css.plusBtn} onClick={onToggle}>
              더보기
            </button>
          </div>
          {on ? <Commentmodal /> : null}
        </div>
      </div>
    </div>
  );
};

export default Finfeedmodal;
