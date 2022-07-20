import React, { useState } from 'react';
import css from './Pin.module.scss';
import BASE_URL from '../../config';

function Pin({ feedOntoggle, data, pinId }) {
  const [on, setOn] = useState(false);
  const [onStore, setOnStore] = useState(true);
  const token = localStorage.getItem('token');

  const modalOn = () => {
    setOn(prev => !prev);
  };
  const modalOut = () => {
    setOn(prev => !prev);
  };
  const btnClick = () => {
    setOnStore(false);
    fetch(`${BASE_URL}/pins/${data.pin_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
      },
    });
  };
  return (
    <div className={css.wrapPin} onMouseEnter={modalOn} onMouseLeave={modalOut}>
      <img
        className={css.pinImg}
        alt="핀이미지"
        src={BASE_URL + '/' + data.image}
        onClick={e => {
          pinId([data.pin_id, data.image]);
          feedOntoggle(e);
        }}
      />
      {on ? (
        <button className={css.buttonStore} onClick={btnClick}>
          {onStore ? '저장' : '저장됨'}
        </button>
      ) : null}
      {on ? (
        <div className={css.pinModal}>
          <button className={css.buttonProfile}>프로필</button>
        </div>
      ) : null}
    </div>
  );
}

export default Pin;
