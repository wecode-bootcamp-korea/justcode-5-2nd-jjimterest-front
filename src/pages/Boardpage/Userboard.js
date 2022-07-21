import React, { useState, useEffect } from 'react';
import css from './Userboard.module.scss';
import Created from '../../components/Myprofile/Created';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import BASE_URL from '../../config';

function Userboard() {
  const params = useParams();
  const { nickname, boardname } = params;
  const [userPins, setUserPins] = useState();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjU4MTk0OTQzfQ.NCdRjQSoDGLAKuarZU7WTXDWnYWwwc6JLEjoFNEMyM0';

  useEffect(() => {
    const fetchData = async () => {
      const result = await (
        await fetch(`http://${BASE_URL}:10010/profile/${nickname}`, {
          method: 'GET',
          headers: {
            // Authorization: localStorage.getItem('access_token'),
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      setUserPins(result);
    };
    fetchData();
  }, []);

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
            <div className={css.headerBdName}>{boardname}</div>
            <div className={css.headerRight}></div>
          </div>
        </div>
      </div>
      <div className={css.pinList}>
        <Created
          myDate={userPins.boards.filter(data => data.title === boardname)}
        />
      </div>
    </div>
  );
}

export default Userboard;
