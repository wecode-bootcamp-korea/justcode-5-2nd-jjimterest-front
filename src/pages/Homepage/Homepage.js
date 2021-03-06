import React, { useState, useRef, useEffect } from 'react';
import Finfeedmodal from '../../components/Finfeedmodal/Finfeedmodal';
import css from './Homepage.module.scss';
import Pin from '../../components/Pin/Pin';
import Nav from '../../components/Nav/Nav';
import BASE_URL from '../../config';

function Homepage() {
  const [feedOn, setFeedOn] = useState(false);
  const [element, setElement] = useState();
  const [pinData, setPinData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pinId, setPinId] = useState(0);
  const [doneSearch, setDoneSearch] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const target = useRef();

  const feedOntoggle = e => {
    setFeedOn(prev => !prev);
    window.scrollTo(0, 0);
    setElement(e.target);
  };
  console.log(pinData);

<<<<<<< HEAD
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
            setPageNumber(prev => prev + 1);
            setPinData(prev => {
              return prev.concat(data);
=======
  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach(ob => {
        if (ob.isIntersecting) {
          fetch(`${BASE_URL}pins?pagenumber=${pageNumber}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjU4MzY4MzE5fQ.0Z8XRjodmNbm07fjSsAAir14VY255DWt-cXh1FYCy3M',
            },
          })
            .then(res => res.json())
            .then(data => {
              setPageNumber(prev => prev + 1);
              setPinData(prev => {
                return prev.concat(data);
              });
>>>>>>> develop
            });
          });
      }
    });
  };
  const option = { threshold: 1.0 };
  let observer = new IntersectionObserver(callback, option);

  // observer.observe(target.current);

  useEffect(() => {
    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  });

  return (
    <>
      <Nav
        setDoneSearch={setDoneSearch}
        setSearchData={setSearchData}
        observer={observer}
      />
      {feedOn ? (
        <Finfeedmodal setFeedOn={setFeedOn} pinId={pinId} element={element} />
      ) : null}
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
        ???
      </div>
    </>
  );
}

export default Homepage;
