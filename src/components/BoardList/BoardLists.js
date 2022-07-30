import React from 'react';
import BoardList from './BoardList';
import css from './BoardLists.module.scss';

function BoardLists({ data, title, setBoardId }) {
  if (data.length === 0) {
    return <></>;
  } else {
    return (
      <div className={css.boardListModal}>
        {data.map(boardsdata => (
          <BoardList
            key={boardsdata.board_id}
            boardsdata={boardsdata}
            title={title}
            setBoardId={setBoardId}
          />
        ))}
      </div>
    );
  }
}

export default BoardLists;
