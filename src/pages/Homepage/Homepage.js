import React, { useState, useRef, useEffect } from 'react';
import Finfeedmodal from './Finfeedmodal';
import css from './Homepage.module.scss';
import Pin from './Pin';
import Nav, { token } from '../../components/Nav/Nav';
import BASE_URL from '../../config';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

function Homepage() {
  const [feedOn, setFeedOn] = useState(false);
  const [element, setElement] = useState();
  const [pinData, setPinData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchPageNumber, setSearchPageNumber] = useState(2);
  const [pinId, setPinId] = useState(0);
  const [doneSearch, setDoneSearch] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [keyword, setKeyword] = useState();
  const target = useRef();

  const feedOntoggle = e => {
    setFeedOn(prev => !prev);
    window.scrollTo(0, 0);
    setElement(e.target);
  };

  const navigate = useNavigate();

  const userInfo = queryString.parse(useLocation().search);

  const { email, nickname, profileImage, Token, userId } = userInfo;
  const isSocialLoggedIn = useLocation().search.includes('token');

  useEffect(() => {
    if (isSocialLoggedIn) {
      localStorage.setItem('email', email);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('profileImage', profileImage);
      localStorage.setItem('token', Token);
      localStorage.setItem('userId', userId);
      navigate('/main');
    }
  }, [
    email,
    nickname,
    profileImage,
    Token,
    userId,
    isSocialLoggedIn,
    navigate,
  ]);

  const refresh = (pageNumber, keyword, isSearch) =>
    fetch(
      `${BASE_URL}pins?pagenumber=${pageNumber}&keyword=${keyword}&isSearch=${isSearch}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

  useEffect(() => {
    const searchcallback = (entries, observer) => {
      entries.forEach(ob => {
        if (ob.isIntersecting) {
          refresh(searchPageNumber, keyword, false)
            .then(res => res.json())
            .then(data => {
              setSearchPageNumber(prev => prev + 1);
              setSearchData(prev => {
                return prev.concat(data);
              });
              setPinData([]);
            });
        }
      });
    };

    const callback = (entries, observer) => {
      entries.forEach(ob => {
        if (ob.isIntersecting) {
          fetch(`${BASE_URL}pins?pagenumber=${pageNumber}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => res.json())
            .then(data => {
              setPageNumber(prev => prev + 1);
              setPinData(prev => {
                return prev.concat(data);
              });
            });
        }
      });
    };

    let observer = new IntersectionObserver(
      doneSearch ? callback : searchcallback,
      { threshold: 0.5 }
    );

    observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, [target, doneSearch, keyword, pageNumber, searchPageNumber]);

  return (
    <>
      <Nav
        setDoneSearch={setDoneSearch}
        setKeyword={setKeyword}
        setPageNumber={setPageNumber}
        setSearchData={setSearchData}
        setSearchPageNumber={setSearchPageNumber}
        refresh={refresh}
      />
      {feedOn && (
        <Finfeedmodal setFeedOn={setFeedOn} pinId={pinId} element={element} />
      )}
      <div className={css.container}>
        {doneSearch
          ? pinData.map(data => {
              return (
                <Pin
                  key={data.pin_id}
                  feedOntoggle={feedOntoggle}
                  pinId={setPinId}
                  data={data}
                />
              );
            })
          : searchData.map(data => {
              return (
                <Pin
                  key={data.pin_id}
                  feedOntoggle={feedOntoggle}
                  pinId={setPinId}
                  data={data}
                />
              );
            })}
      </div>
      <div className={css.target} ref={target}>
        끝
      </div>
    </>
  );
}

export default Homepage;
