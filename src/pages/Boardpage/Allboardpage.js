import React from 'react';
import css from './Allboardpage.module.scss';
import Created from '../../components/Myprofile/Created';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useParams } from 'react-router-dom';

function Allboardpage() {
  const params = useParams();
  const { nickname } = params;
  const location = useLocation();
  const data = location.state.allPinData;
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div>
          <div className={css.headerContents}>
            <Link to={`/${nickname}`} className={css.linkLay}>
              <div className={css.faArrowLeftBox}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={css.faArrowLeft}
                />
              </div>
            </Link>
            <div className={css.headerBdName}>모든 핀</div>
            <div className={css.headerRight}></div>
          </div>
        </div>
      </div>
      <div className={css.pinList}>
        <Created showBoard={false} myDate={data && data} />
      </div>
    </div>
  );
}

export default Allboardpage;
