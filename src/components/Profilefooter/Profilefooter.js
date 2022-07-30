import React from 'react';
import { Link } from 'react-router-dom';
import css from './Profilefooter.module.scss';
function Profilefooter({ btn }) {
  return (
    <div className={css.footerBox}>
      <Link to={`/`} className={css.linkLay}>
      <div className={css.store} onClick={btn}>
        재설정
      </div>
      </Link>
    </div>
  );
}
export default Profilefooter;
