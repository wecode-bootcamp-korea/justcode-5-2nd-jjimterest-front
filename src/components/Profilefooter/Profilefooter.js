import React from 'react';
import { Link } from 'react-router-dom';
import css from './Profilefooter.module.scss';
function Profilefooter() {
  return (
    <div className={css.footerBox}>
      <Link to={`/mynickname`} className={css.linkLay}>
        <div className={css.store}>재설정</div>
      </Link>
    </div>
  );
}
export default Profilefooter;
