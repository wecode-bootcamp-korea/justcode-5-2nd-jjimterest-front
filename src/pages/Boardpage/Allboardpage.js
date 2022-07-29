import React from 'react';
import css from './Allboardpage.module.scss';
import Created from '../../components/Myprofile/Created';
import { useLocation, useParams } from 'react-router-dom';

function Allboardpage() {
  const params = useParams();
  const { boardname } = params;
  const location = useLocation();
  const data = location.state.allPinData;
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div>
          <div className={css.headerContents}>
            <div className={css.headerBdName}>{boardname}</div>
          </div>
        </div>
      </div>
      <div className={css.pinList}>
        <Created showBoard={false} myDate={data} />
      </div>
    </div>
  );
}

export default Allboardpage;
