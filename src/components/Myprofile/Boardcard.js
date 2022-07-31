import React from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../config';
import css from './Boardcard.module.scss';
function Boardcard({
  boardName,
  pinCnt,
  linkNav,
  nickname,
  firstImg,
  boardData,
}) {
  return (
    <div className={css.allPinContainer}>
      <Link
        to={linkNav ? `/${nickname}/${boardName}` : `/mypage/${boardName}`}
        className={css.linkLay}
        state={{ boardData: boardData }}
      >
        <div className={css.allPinImg}>
          <div className={css.firstImg}>
            <img
              alt="핀이미지"
              src={
                firstImg
                  ? `${BASE_URL}${firstImg}`
                  : `https://i.imgur.com/NBjKaML.jpg`
              }
            />
          </div>
        </div>
        <div className={css.allPinContents}>
          <div className={css.boardName}>{boardName}</div>
          <div className={css.pinCnt}>핀 {pinCnt}개</div>
        </div>
      </Link>
    </div>
  );
}

export default Boardcard;
