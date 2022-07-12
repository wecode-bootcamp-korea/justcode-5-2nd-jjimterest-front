import React, { useState } from 'react';
import CommentBtnmodal from './CommentBtnmodal';
import css from './Commentmodal.module.scss';

const Commentmodal = () => {
  const [on, setOn] = useState(false);

  const commentOn = e => {
    setOn(true);
  };
  return (
    <div className={css.container}>
      <div className={css.comment}>
        <img
          className={css.userImg}
          src="https://i.pinimg.com/564x/9f/c2/5d/9fc25dc174efc6f2d3d8bb0cc28ed3fe.jpg"
        />
        <div className={css.userInfo}>
          <div className={css.userText}>
            <div className={css.userId}>아이디</div>
            <div className={css.userComment}>댓글내용</div>
          </div>
          <div className={css.commentInfo}> 날짜 답변 좋아요 </div>
        </div>
      </div>
      <div className={css.commentInputContainer}>
        <img
          className={css.myImg}
          src="https://i.pinimg.com/474x/f3/6d/5d/f36d5d6266c6ac25f7c1a8911f17ab77.jpg"
        />
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
