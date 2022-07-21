import React, { useState } from 'react';
import NestedComments from '../NestedComments/NestedComments';
import css from './Comment';

function Comment({ data }) {
  const [on, setOn] = useState(false);
  console.log('댓글', data);
  const NestedCommentsOn = () => {
    setOn(true);
  };
  return (
    <div>
      <img src={data.profile_image} alt="이미지" />
      <div>
        <div>
          <div>{data.user_id}</div>
          <div>{data.content}</div>
        </div>
        <div>
          <div>{data.created_at}</div>
          <button onClick={NestedCommentsOn}>대댓글버튼</button>
          {on ? <NestedComments /> : null}
          <div>{data.like_count}</div>
          <div>삭제</div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
