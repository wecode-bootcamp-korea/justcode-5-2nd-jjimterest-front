import React, { useState } from 'react';
import css from './Pin.module.scss';
import BASE_URL from '../../config';
import { token } from '../../components/Nav/Nav';

function Pin({ feedOntoggle, data, pinId }) {
  const [on, setOn] = useState(false);
  const [onStore, setOnStore] = useState(true);

  const modalOn = () => {
    setOn(prev => !prev);
  };

  const modalOut = () => {
    setOn(prev => !prev);
  };

  const btnClick = () => {
    fetch(`${BASE_URL}pins/${data.pin_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setOnStore(false);

      });
  };
  return (
    <div className={css.wrapPin} onMouseEnter={modalOn} onMouseLeave={modalOut}>
      <img
        className={css.pinImg}
        alt="핀이미지"
        src={BASE_URL + data.image}
        onClick={e => {
          pinId([data.pin_id, data.image]);
          feedOntoggle(e);
        }}
      />
      {on && (
        <button className={css.buttonStore} onClick={btnClick}>
          {onStore ? '저장' : '저장됨'}
        </button>
      )}
      {on && (
        <div className={css.pinModal}>
          <button className={css.buttonProfile}>프로필</button>
        </div>
      )}
    </div>
  );
}

export default Pin;
