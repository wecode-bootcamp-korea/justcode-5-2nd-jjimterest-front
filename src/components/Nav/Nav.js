import React, { useState, useEffect, useRef } from 'react';
import css from './Nav.module.scss';
import Recent from './Recent';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';

function Nav({
  setDoneSearch,
  setKeyword,
  setPageNumber,
  setSearchData,
  setSearchPageNumber,
  refresh,
}) {
  const [profileImg, setProfileImg] = useState();
  const [pName, setPName] = useState();
  const search = useRef();

  useEffect(() => {
    fetch(`${BASE_URL}edit-profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
    })
      .then(res => res.json())
      .then(data => {
        setPName(data);
        setProfileImg(data[0].profile_image);
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
    fetch(`${BASE_URL}recent-search`, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
    });
  };

  const focus = () => {
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

  const gotokeyword = e => {
    setSearchPageNumber(2);
    setSearchData([]);
    setPageNumber(1);
    setDoneSearch(false);
    refresh(1, e.target.value, true)
      .then(res => res.json())
      .then(data => {
        setSearchData(prev => {
          return prev.concat(data);
        });
      });
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
          onFocus={focus}
          onBlur={offToggle}
          onChange={e => {
            setKeyword(e.target.value);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              gotokeyword(e);
            }
          }}
        />
        {on ? <Recent onToggle={onToggle} /> : null}
      </div>
      <div className={css.emoji}>
        <button className={css.message}>message</button>
        <Link to={`/mypage`} state={{ pName: pName }}>
          <img
            className={css.profileImg}
            src={
              profileImg &&
              (profileImg[0] === 'h' ? profileImg : `${BASE_URL}` + profileImg)
            }
            alt="유저프로필이미지"
          />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
