import React, { useEffect, useState } from 'react';
import css from './Recent.module.scss';
import BASE_URL from '../../config';
import { token } from './Nav';

const Recent = ({ onToggle }) => {
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(`${BASE_URL}recent-search`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            setRecentSearch([]);
          } else {
            setRecentSearch(data);
          }
        });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={css.container}>
      <div className={css.wrapRecent}>
        <div className={css.recentSearch}>
          <div className={css.RecentText}>최근 검색 기록</div>
        </div>
        <button className={css.deleteBtn} onClick={onToggle}>
          X
        </button>
      </div>
      <div className={css.text}>
        {recentSearch.map((data, idx) => {
          return (
            <button className={css.keyword} key={idx}>
              {data.keyword}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Recent;
