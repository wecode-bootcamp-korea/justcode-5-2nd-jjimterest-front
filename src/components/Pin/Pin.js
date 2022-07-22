import React, { useState } from 'react';
import css from './Pin.module.scss';
import BASE_URL from '../../config';

function Pin({ feedOntoggle, data, pinId }) {
  const [on, setOn] = useState(false);
  const [onStore, setOnStore] = useState(true);
  // const token = localStorage.getItem('token');

  const modalOn = () => {
    setOn(prev => !prev);
  };

  const modalOut = () => {
    setOn(prev => !prev);
  };
  const btnClick = () => {
    fetch(`${BASE_URL}/pins/${data.pin_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
    })
      .then(res => res.json())
      .then(data => console.log(data));
    setOnStore(false);
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
