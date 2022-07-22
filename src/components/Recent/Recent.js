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
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4MTQxNjkzfQ.1VvOO4zwJX_UDWT7jzXSouA1khl14bCpL-McJu-0OQM',
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
        {recentSearch.map(data => {
          return <button className={css.keyword}>{data.keyword}</button>;
        })}
      </div>
    </div>
  );
};

export default Recent;
