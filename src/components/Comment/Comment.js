import React, { useState } from 'react';
import NestedComments from '../NestedComments/NestedComments';
import css from './Comment';

function Comment() {
  const [on, setOn] = useState(false);

  const NestedCommentsOn = () => {
    setOn(true);
  };
  return (
    <div>
      <div>유저 이미지</div>
      <div>
        <div>
          <div>아이디</div>
          <div>유저댓글</div>
        </div>
        <div>
          <div>시간</div>
          <button onClick={NestedCommentsOn}>대댓글버튼</button>
          {on ? <NestedComments /> : null}
          <div>조아요</div>
          <div>삭제</div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
