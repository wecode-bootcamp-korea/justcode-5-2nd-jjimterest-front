import React from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../config';
import css from './Allboardcard.module.scss';
function Allboardcard({ boardName, pinCnt, nickname, firstImg, allPin }) {
  return (
    <div className={css.allPinContainer}>
      <Link
        to={`/${nickname}/${boardName}/all`}
        className={css.linkLay}
        state={{ allPinData: allPin }}
      >
        <div className={css.allPinImg}>
          <div className={css.firstImg}>
            <img
              alt="핀이미지"
              src={firstImg ? `${BASE_URL}${firstImg}` : ''}
            />
          </div>
        </div>
        <div className={css.allPinContents}>
          <div className={css.boardName}>모든핀</div>
          <div className={css.pinCnt}>핀 {pinCnt ? pinCnt : 0}개</div>
        </div>
      </Link>
    </div>
  );
}

export default Allboardcard;
