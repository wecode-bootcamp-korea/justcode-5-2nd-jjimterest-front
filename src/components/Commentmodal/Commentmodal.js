import React, { useState } from 'react';
import CommentBtnmodal from './CommentBtnmodal';
import Comment from '../Comment/Comment.js';
import css from './Commentmodal.module.scss';

const Commentmodal = ({ pinData }) => {
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
    </div>
  );
};

export default Commentmodal;
