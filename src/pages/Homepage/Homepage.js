import React, { useState, useRef, useEffect } from 'react';
import Finfeedmodal from '../../components/Finfeedmodal/Finfeedmodal';
import css from './Homepage.module.scss';
import Pin from '../../components/Pin/Pin';
import Nav from '../../components/Nav/Nav';
import BASE_URL from '../../config';
// import queryString from 'query-string';
// import { useLocation, useNavigate } from 'react-router-dom';

function Homepage() {
  const target = useRef();
  const [feedOn, setFeedOn] = useState(false);
  const [element, setElement] = useState();
  const [pinData, setPinData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pinId, setPinId] = useState();

  // const navigate = useNavigate();

  // const userInfo = queryString.parse(useLocation().search);

  // const { email, nickname, profileImage, token, userId } = userInfo;
  // const isSocialLoggedIn = useLocation().search.includes('token');

  // useEffect(() => {
  //   if (isSocialLoggedIn) {
  //     localStorage.setItem('email', email);
  //     localStorage.setItem('nickname', nickname);
  //     localStorage.setItem('profileImage', profileImage);
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('userId', userId);
  //     navigate('/');
  //   }
  // }, [
  //   email,
  //   nickname,
  //   profileImage,
  //   token,
  //   userId,
  //   isSocialLoggedIn,
  //   navigate,
  // ]);

  const feedOntoggle = e => {
    setFeedOn(prev => !prev);
    window.scrollTo(0, 0);
    setElement(e.target);
  };

  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach(ob => {
        if (ob.isIntersecting) {
          fetch(`${BASE_URL}/pins?pagenumber=${pageNumber}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
            },
          })
            .then(res => res.json())
            .then(data => {
              setPinData(data);
            });
          setPageNumber(prev => prev + 1);
        }
      });
    };
    const option = { threshold: 1.0 };
    let observer = new IntersectionObserver(callback, option);

    observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Nav />
      {feedOn ? (
        <Finfeedmodal setFeedOn={setFeedOn} pinId={pinId} element={element} />
      ) : null}
      <div className={css.container}>
        {pinData.map(data => {
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
      <div ref={target}>끝입니다</div>
    </>
  );
}

export default Homepage;
