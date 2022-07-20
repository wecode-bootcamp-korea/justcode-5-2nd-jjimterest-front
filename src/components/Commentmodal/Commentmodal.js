import React, { useState } from 'react';
import CommentBtnmodal from './CommentBtnmodal';
import Comment from '../Comment/Comment.js';
import css from './Commentmodal.module.scss';

const Commentmodal = () => {
  const [on, setOn] = useState(false);

  const [list, setList] = useState([{ id: 1 }, { id: 2 }]);

  const commentOn = e => {
    setOn(true);
  };

  return (
    <div className={css.container}>
      <div className={css.commentList}>
        {list.map((data, idx) => {
          return <Comment key={idx} />;
        })}
      </div>
      <div className={css.commentInputContainer}>
        <img
          className={css.myImg}
          src="https://i.pinimg.com/474x/0a/e4/b5/0ae4b59bc2446f6808e284aada3bbe86.jpg"
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
