import React, { useState, useRef, useEffect } from 'react';
import Finfeedmodal from '../../components/Finfeedmodal/Finfeedmodal';
import css from './Homepage.module.scss';
import Pin from '../../components/Pin/Pin';
import Nav from '../../components/Nav/Nav';

function Homepage() {
  const target = useRef();
  const [on, setOn] = useState(false);
  const [feedOn, setFeedOn] = useState(false);
  const [element, setElement] = useState();
  const [pinData, setPinData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data/pindata.json')
      .then(res => res.json())
      .then(data => {
        setPinData(data);
      });
  }, []);

  const modalOn = () => {
    setOn(prev => !prev);
  };

  const modalOut = () => {
    setOn(prev => !prev);
  };

  const feedOntoggle = e => {
    setFeedOn(prev => !prev);
    window.scrollTo(0, 0);
    setElement(e.target);
  };

  const callback = (entries, observer) => {
    entries.forEach(ob => {
      if (ob.isIntersecting) {
        console.log('로딩화면시작');
        setPinData(prev => {
          console.log('로딩화면종료');
          return [...prev, 1, 1, 1];
        });
      }
    });
  };
  const option = { threshold: 1.0 };

  useEffect(() => {
    let observer = new IntersectionObserver(callback, option);

    observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Nav />
      {feedOn ? <Finfeedmodal setFeedOn={setFeedOn} element={element} /> : null}
      <div className={css.container}>
        {pinData.map(pin => {
          return <Pin />;
        })}
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8b2NlYW4lMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        {/* <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1527731149372-fae504a1185f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG9jZWFuJTIwYmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1623239203472-f10f554e0d31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8b2NlYW4lMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1657214059175-53cb22261d38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div>
        <div className={css.wrapPin}>
          <img
            onMouseEnter={modalOn}
            onMouseLeave={modalOut}
            onClick={feedOntoggle}
            className={css.pinImg}
            alt="핀이미지"
            src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bHVzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />
          {on ? (
            <div className={css.pinModal}>
              <button className={css.buttonProfile}>프로필</button>
              <button className={css.buttonStore}>저장</button>
            </div>
          ) : null}
        </div> */}
        <div ref={target}>끝입니다</div>
      </div>
    </>
  );
}

export default Homepage;
