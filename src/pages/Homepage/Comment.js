import React, { useState } from 'react';
import NestedComments from '../../pages/Homepage/NestedComments';
import css from './Comment.module.scss';
import BASE_URL from '../../config';
import Nestedcomment from '../../pages/Homepage/Nestedcomment';
import { token } from '../../components/Nav/Nav';

function Comment({ data, pinId, nestedcomments }) {
  const [on, setOn] = useState(false);
  const [likeCount, setLikeCount] = useState(data.like_count);
  const now = new Date().getTime();
  const be = new Date(data.created_at);
  const before = be.getTime();
  const time = (now - before) / 1000 / 60;
  const [nestOn, setNestOn] = useState(true);

  const NestedCommentsOn = () => {
    setOn(true);
  };
  const compare = () => {
    if (time < 60) {
      return `${Math.floor(time)}분전 `;
    } else if (time / 60 < 24) {
      return `${Math.floor(time / 60)}시간 전`;
    } else {
      return `${Math.floor(time / 1440)}일 전`;
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
  const nestedcommentstoggle = () => {
    setNestOn(prev => !prev);
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
        {nestedcomments[0] &&
          (nestOn ? (
            <div onClick={nestedcommentstoggle} className={css.nestedcomment}>
              --- 답변 {nestedcomments.length}개 보기
            </div>
          ) : (
            <div onClick={nestedcommentstoggle} className={css.nestedcomment}>
              --- 답변 숨기기
            </div>
          ))}
        {(nestedcomments[0] && nestOn) ||
          nestedcomments.map(data => {
            return <Nestedcomment key={data.id} data={data} pinId={pinId} />;
          })}
      </div>
    </div>
  );
}

export default Comment;
