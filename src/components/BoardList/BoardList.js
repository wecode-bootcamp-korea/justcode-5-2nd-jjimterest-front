import React from 'react';
import css from './BoardList.module.scss';

const BoardList = ({ boardsdata, title }) => {
  return (
    <div className={css.boardListModal}>
      <div
        className={css.wrapBoardInfo}
        onMouseEnter={e => {
          e.target.style = 'background-color: rgba(0, 0, 0, 0.139);';
        }}
        onMouseLeave={e => {
          e.target.style = 'white';
        }}
        onClick={() => {
          title(boardsdata.title);
        }}
      >
        <img
          className={css.boardListImg}
          src={
            boardsdata.cover_image_url ||
            'https://i.pinimg.com/474x/03/b5/36/03b53665b1e391467f60bc7712d6aaad.jpg'
          }
          alt="이미지"
        />
        <div className={css.wrapTitle}>
          <div className={css.boradTitle}>{boardsdata.title}</div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
