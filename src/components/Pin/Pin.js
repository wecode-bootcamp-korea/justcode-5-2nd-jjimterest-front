import React, { useState } from 'react';
import css from './Pin.module.scss';

function Pin() {
  const [on, setOn] = useState(false);
  const [feedOn, setFeedOn] = useState(false);

  const modalOn = () => {
    setOn(prev => !prev);
  };

  const modalOut = () => {
    setOn(prev => !prev);
  };

  const feedOntoggle = () => {
    setFeedOn(prev => !prev);
    window.scrollTo(0, 0);
  };

  return (
    <div className={css.wrapPin}>
      <img
        onMouseEnter={modalOn}
        onMouseLeave={modalOut}
        onClick={feedOntoggle}
        className={css.pinImg}
        alt="핀이미지"
        src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b2NlYW4lMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60"
      />
      {on ? (
        <div className={css.pinModal}>
          <button className={css.buttonProfile}>프로필</button>
          <button className={css.buttonStore}>저장</button>
        </div>
      ) : null}
    </div>
  );
}

export default Pin;
