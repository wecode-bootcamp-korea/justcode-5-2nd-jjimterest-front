import React from 'react';
import css from './Created.module.scss';
function Created({ showBoard, myDate }) {
  return (
    <div className={css.boardContainer}>
      {/* 맵뿌리기 */}
      {showBoard
        ? myDate.map((data, index) => {
            <div className={css.imgcontainer}>
              <img alt="핀이미지" src={`${data.image}`} />
              <div>만든이사진 만든이이름</div>
            </div>;
          })
        : myDate.map((data, index) => {
            <div className={css.imgcontainer}>
              <img alt="핀이미지" src="https://i.imgur.com/GushnG1.jpg" />
            </div>;
          })}
    </div>
  );
}

export default Created;
