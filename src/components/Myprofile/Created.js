import React from 'react';
import BASE_URL from '../../config';
import css from './Created.module.scss';
function Created({ showBoard, myDate }) {
  return (
    <div className={css.boardContainer}>
      {showBoard
        ? myDate &&
          myDate.map((data, index) => {
            return (
              <div className={css.imgcontainer} key={index}>
                <img alt="핀이미지" src={`${BASE_URL}${data.image}`} />
                <div>만든이사진 만든이이름</div>
              </div>
            );
          })
        : myDate &&
          myDate.map((data, index) => {
            return (
              <div className={css.imgcontainer} key={index}>
                <img alt="핀이미지" src={`${BASE_URL}${data.image}`} />
              </div>
            );
          })}
    </div>
  );
}

export default Created;
