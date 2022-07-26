import React, { useEffect, useState } from 'react';
import css from './Recent.module.scss';
import BASE_URL from '../../config';

const Recent = ({ onToggle }) => {
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/recent-search`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
    })
      .then(res => res.json())
      .then(data => {
        setRecentSearch(data);
      });
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
