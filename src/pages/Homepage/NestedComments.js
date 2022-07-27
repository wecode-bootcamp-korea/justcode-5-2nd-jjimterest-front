import React, { useState } from 'react';
import css from './NestedComments.module.scss';
import BASE_URL from '../../config';
import { token } from '../../components/Nav/Nav';

function NestedComments({ data, setOn, pinId }) {
  const myImg = localStorage.getItem('myImg');
  const [comment, setComment] = useState('');

  const parent = () => {
    if (data.parent_id) {
      return data.parent_id;
    } else {
      return data.id;
    }
  };

  const send = () => {
    fetch(`${BASE_URL}comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        parent_id: parent(),
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
      <img
        className={css.myImg}
        src={
          myImg &&
          'https://www.ibossedu.co.kr/template/DESIGN_shared/program/theme/01/THUMBNAIL_60_60_icon_rep_box.gif'
        }
        alt="이미지"
      />
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
