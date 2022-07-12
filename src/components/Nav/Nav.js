import React, { useState, useEffect, useRef } from 'react';
import css from './Nav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import Recent from '../Recent/Recent';
import { useNavigate } from 'react-router-dom';

function Nav({ setFeedOn }) {
  const navigate = useNavigate();
  const nav = useRef();

  const [on, setOn] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', scrollY);
    return () => {
      window.removeEventListener('scroll', scrollY);
    };
  });

  const scrollY = () => {
    setScroll(window.scrollY);
    if (scroll > 15) {
      nav.current.style.backgroundColor = 'black';
    } else {
      nav.current.style.backgroundColor = 'white';
    }
  };

  const onToggle = () => {
    setOn(true);
  };
  const offToggle = () => {
    setOn(false);
  };
  const gotohome = () => {
    navigate('/');
    setFeedOn(false);
  };
  const gotopainpage = () => {
    navigate('/finpage');
  };

  const gotoprofile = () => {
    navigate('/mypage');
  };

  return (
    <div className={css.nav} ref={nav}>
      <div className={css.wrapBtn}>
        <button className={css.homeBtn} onClick={gotohome}>
          홈
        </button>
        <button className={css.addBtn} onClick={gotopainpage}>
          핀만들기
        </button>
      </div>
      <div className={css.wrapSearchBar}>
        <input
          className={css.search}
          placeholder="검색"
          onFocus={onToggle}
          onBlur={offToggle}
        />
        {on ? <Recent /> : null}
      </div>
      <div className={css.emoji}>
        <FontAwesomeIcon icon={faCommentDots} className={css.message} />
        <img
          className={css.profileImg}
          src="https://images.unsplash.com/photo-1533749968753-1a9994823766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGx1c2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          onClick={gotoprofile}
        />
      </div>
    </div>
  );
}

export default Nav;
