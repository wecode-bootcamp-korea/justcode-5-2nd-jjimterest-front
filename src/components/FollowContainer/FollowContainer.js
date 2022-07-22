import React from 'react';
import BASE_URL from '../../config';
import css from './FollowContainer.module.scss';

function FollowContainer({ img, userName }) {
  return (
    <div className={css.container}>
      <img
        alt="프로필 이미지"
        src={`${img && (img === 'h' ? img : `${BASE_URL}` + img)}`}
      />
      <div>{userName}</div>
    </div>
  );
}

export default FollowContainer;
