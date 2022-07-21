import React, { useState } from 'react';
import CommentBtnmodal from './CommentBtnmodal';
import Comment from '../Comment/Comment.js';
import css from './Commentmodal.module.scss';

const Commentmodal = ({ pinData }) => {
  const myImg = localStorage.getItem('myimg');
  const [on, setOn] = useState(false);
  console.log('pin', pinData);
  const commentOn = e => {
    setOn(true);
  };

  return (
    <div className={css.container}>
      <div className={css.commentList}>
        {pinData !== null &&
          pinData
            .filter(data => data.parent_id === null)
            .map((data, idx) => {
              return <Comment key={idx} data={data} />;
            })}
      </div>
      <div className={css.commentInputContainer}>
        <img className={css.myImg} src={myImg} alt="이미지" />
        <input
          className={css.commentInput}
          placeholder="댓글 추가"
          onFocus={commentOn}
        />
      </div>
      {on ? <CommentBtnmodal setOn={setOn} /> : null}
    </div>
  );
};

export default Commentmodal;
