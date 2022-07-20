import React, { useState, useEffect, useRef } from 'react';
import css from './Nav.module.scss';
import Recent from '../Recent/Recent';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';

function Nav() {
  const [profileImg, setProfileImg] = useState();
  const search = useRef();

  useEffect(() => {
    fetch(`${BASE_URL}/edit-profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
      },
    })
      .then(res => res.json())
      .then(data => {
        setProfileImg(data[0].profile_image);
        localStorage.setItem('myimg', data[0].profile_image);
      });
  }, []);

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
      nav.current.style.backgroundColor = 'white';
    } else {
      nav.current.style.backgroundColor = 'white';
    }
  };
  const onToggle = () => {
    setOn(true);
    search.current.focus();
  };
  const offToggle = () => {
    setTimeout(() => {
      if (document.activeElement !== search.current) {
        return setOn(false);
      }
    }, 120);
  };
  const gotohome = () => {
    navigate('/');
    window.location.reload();
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
          ref={search}
          className={css.search}
          placeholder="검색"
          onFocus={onToggle}
          onBlur={offToggle}
        />
        {on ? <Recent onToggle={onToggle} /> : null}
      </div>
      <div className={css.emoji}>
        <button className={css.message}>message</button>
        <img
          className={css.profileImg}
          src={profileImg !== undefined && profileImg}
          onClick={gotoprofile}
          alt="유저프로필이미지"
        />
      </div>
    </div>
  );
}

export default Nav;
