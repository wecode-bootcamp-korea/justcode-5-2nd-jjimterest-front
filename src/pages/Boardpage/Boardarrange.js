import React from 'react';
import css from './Boardarrange.module.scss';
import Created from '../../components/Myprofile/Created';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

function Boardarrange() {
  const params = useParams();
  const { boardname } = params;
  const location = useLocation();
  const data = location.state.data;

  return (
    <div className={css.container}>
      <Nav />
      <div className={css.header}>
        <div>
          <div className={css.headerContents}>
            <div className={css.headerBdName}>선택 및 재정렬</div>
            <div className={css.headerRight}></div>
          </div>
        </div>
      </div>
      <div className={css.uiNav}>
        <div className={css.pinCnt}>시작 할 핀 선택</div>
        <div className={css.allBtn}>모두 선택</div>
      </div>
      <div className={css.pinList}>
        <Created showBoard={false} myDate={data && data.pins} />
      </div>
      <div className={css.footer}>
        <div>
          <FontAwesomeIcon icon={faTrash} className={css.faTrash} />
        </div>
      </div>
    </div>
  );
}

export default Boardarrange;
