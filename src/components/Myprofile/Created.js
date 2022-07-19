import React from 'react';
import css from './Created.module.scss';
function Created() {
  return (
    <div className={css.boardContainer}>
      {/* 맵뿌리기 */}
      <div className={css.imgcontainer}>
        <img
          alt="핀이미지"
          src="https://images.unsplash.com/photo-1625887803552-9a80d55f37fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGx1c2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        />
      </div>
    </div>
  );
}

export default Created;
