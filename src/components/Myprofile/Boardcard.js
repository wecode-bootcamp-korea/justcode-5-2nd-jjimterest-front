import React from 'react';
import css from './Boardcard.module.scss';
function Boardcard({ boardName, pinCnt }) {
  return (
    <div className={css.allPinContainer}>
      <div className={css.allPinImg}>
        <div className={css.firstImg}>
          <img
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
        </div>
      </div>
      <div className={css.allPinContents}>
        <div className={css.boardName}>{boardName}</div>
        <div className={css.pinCnt}>핀 {pinCnt}개</div>
      </div>
    </div>
  );
}

export default Boardcard;
