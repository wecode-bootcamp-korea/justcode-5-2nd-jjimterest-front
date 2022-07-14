import React, { useState } from 'react';
import css from './Finfeedmodal.module.scss';
import Commentmodal from '../Commentmodal/Commentmodal';

const Finfeedmodal = ({ setFeedOn, element }) => {
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
          src="https://i.pinimg.com/564x/8d/90/b2/8d90b2c4b0dcc424af6fab161a4fec46.jpg"
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
                src="https://i.pinimg.com/564x/9f/c2/5d/9fc25dc174efc6f2d3d8bb0cc28ed3fe.jpg"
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
