import React from 'react';
import css from './BoardList.module.scss';

function BoardList({ data }) {
  return (
    <div className={css.boardListModal}>
      아예이요우
      {/* {data.map(data => {
        return (
          <>
            <img src={data.url} />
            <div>{data.img}</div>
          </>
        );
      })} */}
    </div>
  );
}

export default BoardList;
