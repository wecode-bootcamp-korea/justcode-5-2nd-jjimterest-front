import React from 'react';
import css from './Recent.module.scss';

const Recent = () => {
  return (
    <>
      <div className={css.wrapRecent}>
        <div className={css.recentSearch}>최근검색</div>
        <button className={css.deleteBtn}>X</button>
      </div>
      <div className={css.text}>맵으로 돌릴 최근검색 텍스트</div>
    </>
  );
};

export default Recent;
