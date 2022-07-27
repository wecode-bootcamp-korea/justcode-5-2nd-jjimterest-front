import React, { useState } from 'react';
import css from './NestedComments.module.scss';
import BASE_URL from '../../config';

function NestedComments({ data, setOn, pinId }) {
  const myImg = localStorage.getItem('myimg');
  const [comment, setComment] = useState('');

  const send = () => {
    fetch(`${BASE_URL}comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
      body: JSON.stringify({
        parent_id: data.id,
        pin_id: pinId,
        content: comment,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setComment('');
      });
  };
  return (
    <div className={css.commentInputContainer}>
      <img className={css.myImg} src={myImg} alt="이미지" />
      <input
        className={css.commentInput}
        placeholder="답변 추가"
        value={comment}
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      <button
        className={css.cancle}
        onClick={() => {
          setOn(false);
        }}
      >
        취소
      </button>
      <button className={css.send} onClick={send}>
        완료
      </button>
    </div>
  );
}

export default NestedComments;
