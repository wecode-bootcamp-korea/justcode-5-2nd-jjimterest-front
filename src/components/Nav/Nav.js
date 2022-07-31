import React, { useState, useEffect, useRef } from 'react';
import css from './Nav.module.scss';
import Recent from './Recent';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BASE_URL from '../../config';
export const token = localStorage.getItem('token');

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
  const location = useLocation();
  const home = useRef();

  const img = data => {
    if (data[0].profile_image.includes('http')) {
      return data[0].profile_image;
    } else {
      return BASE_URL + data[0].profile_image;
    }
  };

  useEffect(() => {
    if (location.pathname === '/main') {
      home.current.style.backgroundColor = 'black';
      home.current.style.color = 'white';
    }
  }, [location.pathname]);

  useEffect(() => {
    fetch(`${BASE_URL}edit-profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPName(data);
        setProfileImg(data[0].profile_image);
        localStorage.setItem(
          'myImg',
          data[0].profile_image
            ? img(data)
            : 'https://www.ibossedu.co.kr/template/DESIGN_shared/program/theme/01/THUMBNAIL_60_60_icon_rep_box.gif'
        );
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
        Authorization: `Bearer ${token}`,
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
    navigate('/main');
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
        <button ref={home} className={css.homeBtn} onClick={gotohome}>
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
        {/* <button className={css.message}>message</button> */}
        <Link to={`/mypage`} state={{ pName: pName }}>
          <img
            className={css.profileImg}
            src={
              profileImg
                ? profileImg[0] === 'h'
                  ? profileImg
                  : `${BASE_URL}` + profileImg
                : 'https://www.ibossedu.co.kr/template/DESIGN_shared/program/theme/01/THUMBNAIL_60_60_icon_rep_box.gif'
            }
            alt="유저프로필이미지"
          />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
