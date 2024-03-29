import React from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../config';
import css from './FollowContainer.module.scss';

function FollowContainer({ img, userName, nName, onClose }) {
  return (
    <Link to={`/${nName}`} className={css.linkLay}>
      <div className={css.container} onClick={onClose}>
        <img
          alt="프로필 이미지"
          src={`${img && (img[0] === 'h' ? img : `${BASE_URL}` + img)}`}
        />
        <div>{userName}</div>
      </div>
    </Link>
  );
}

export default FollowContainer;
