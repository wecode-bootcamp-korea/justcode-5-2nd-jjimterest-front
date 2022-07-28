import React from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../config';
import Finfeedmodal from '../../pages/Homepage/Finfeedmodal';
import css from './Created.module.scss';
function Created({ showBoard, myDate }) {
  return (
    <div className={css.boardContainer}>
      {showBoard
        ? myDate &&
          myDate.map((data, index) => {
            return (
              <div className={css.imgcontainer} key={index}>
                <Link to={`/main`}>
                  <img alt="핀이미지" src={`${BASE_URL}${data.image}`} />
                  <div>만든이사진 만든이이름</div>
                </Link>
              </div>
            );
          })
        : myDate &&
          myDate.map((data, index) => {
            return (
              <div className={css.imgcontainer} key={index}>
                <Link to={`/main`}>
                  <img alt="핀이미지" src={`${BASE_URL}${data.image}`} />
                </Link>
              </div>
            );
          })}
    </div>
  );
}

export default Created;
