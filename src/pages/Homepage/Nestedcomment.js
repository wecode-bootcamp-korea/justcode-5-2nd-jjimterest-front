import React, { useState } from 'react';
import BASE_URL from '../../config';
import css from './Nestedcomment.module.scss';
import NestedComments from './NestedComments';
import { token } from '../../components/Nav/Nav';

function Nestedcomment({ data, pinId }) {
  const [on, setOn] = useState(false);
  const [likeCount, setLikeCount] = useState(data.like_count);
  const now = new Date().getTime();
  const be = new Date(data.created_at);
  const before = be.getTime();
  const time = (now - before) / 1000 / 60;

  const NestedCommentsOn = () => {
    setOn(true);
  };
  const compare = () => {
    if (time < 60) {
      return `${Math.floor(time)}분전 `;
    } else {
      return `${Math.floor(time / 60)}시간 전`;
    }
  };
  const compareTime = compare();

  const deletecommnet = () => {
    fetch(`${BASE_URL}comments/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const likeBtn = () => {
    fetch(`${BASE_URL}comments/${data.id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.like_count === 1) {
          setLikeCount(prev => {
            return prev + 1;
          });
        } else {
          setLikeCount(prev => {
            return prev - 1;
          });
        }
      });
  };
  return (
    <div className={css.commentContainer}>
      <img className={css.commentImg} src={data.profile_image} alt="이미지" />
      <div className={css.secondWrap}>
        <div className={css.firstLine}>
          <h4 className={css.nickname}>{data.nickname}</h4>
          <div className={css.content}>{data.content}</div>
        </div>
        <div className={css.secondLine}>
          <div className={css.time}>{compareTime}</div>
          <div className={css.recomment} onClick={NestedCommentsOn}>
            답변
          </div>
          <div className={css.like} onClick={likeBtn}>
            좋아요{likeCount ? `${likeCount}개` : '0개'}
          </div>
          <div className={css.delete} onClick={deletecommnet}>
            삭제
          </div>
        </div>
        {on && <NestedComments data={data} setOn={setOn} pinId={pinId} />}
      </div>
    </div>
  );
}

export default Nestedcomment;
