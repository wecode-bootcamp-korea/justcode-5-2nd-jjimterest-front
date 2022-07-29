import React from 'react';
import BoardList from './BoardList';

function BoardLists({ data, title }) {
  return (
    <>
      {data.map(boardsdata => (
        <BoardList
          key={boardsdata.board_id}
          boardsdata={boardsdata}
          title={title}
        />
      ))}
    </>
  );
}

export default BoardLists;
