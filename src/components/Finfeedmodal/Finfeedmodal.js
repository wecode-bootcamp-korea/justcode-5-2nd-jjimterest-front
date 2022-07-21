import React, { useEffect, useState } from 'react';
import css from './Finfeedmodal.module.scss';
import Commentmodal from '../Commentmodal/Commentmodal';
import BASE_URL from '../../config';

const Finfeedmodal = ({ setFeedOn, element, pinId }) => {
  const [pinData, setPinData] = useState();
  useEffect(() => {
    fetch(`${BASE_URL}/pins/${pinId[0]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, '댓글데이터');
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
      <button className={css.back} onClick={closePin}>
        X
      </button>
      <div className={css.container}>
        <img
          className={css.feedImg}
          src={BASE_URL + '/' + pinId[1]}
          alt="핀이미지"
        />
        <div className={css.messenger}>
          <div className={css.toolbar}>
            <button className={css.boardBtn}>보드</button>
            <button className={css.storeBtn}>저장</button>
          </div>
          {/* <div className={css.userName}>업로드한 사람 : username</div> */}
          <div className={css.pinTitle}>
            {pinData !== undefined && pinData[0].title}
          </div>
          <div className={css.pinAlt}>Alt</div>
          <div className={css.wrapUserContents}>
            <div className={css.userContents}>
              <img
                className={css.userImg}
                src="https://i.pinimg.com/474x/a6/66/b2/a666b2f0822587f08168bd9726c51d69.jpg"
                alt="유저사진"
              />
              <div className={css.userText}>
                <p className={css.userId}>
                  {pinData !== undefined && pinData[0].nickname}
                </p>
                <p className={css.follow}>
                  {pinData !== undefined && pinData[0].count}
                </p>
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
        </div>
      </div>
    </div>
  );
};

export default Finfeedmodal;
