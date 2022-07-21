import React, { useState, useRef, useEffect } from 'react';
import Finfeedmodal from '../../components/Finfeedmodal/Finfeedmodal';
import css from './Homepage.module.scss';
import Pin from '../../components/Pin/Pin';
import Nav from '../../components/Nav/Nav';
import BASE_URL from '../../config';

function Homepage() {
  const target = useRef();
  const [feedOn, setFeedOn] = useState(false);
  const [element, setElement] = useState();
  const [pinData, setPinData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pinId, setPinId] = useState(0);

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
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
            },
          })
            .then(res => res.json())
            .then(data => {
              setPinData(prev => {
                return prev.concat(data);
              });
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
  }, [pageNumber]);

  return (
    <>
      <Nav />
      {feedOn ? (
        <Finfeedmodal setFeedOn={setFeedOn} pinId={pinId} element={element} />
      ) : null}
      <div className={css.container}>
        {pinData.map((data, idx) => {
          return (
            <Pin
              key={idx}
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
