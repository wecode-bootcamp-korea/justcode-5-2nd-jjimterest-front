import React from 'react';
import css from './Boardpage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faSquareCheck,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../components/Myprofiledropdown/Dropdown';
import Created from '../../components/Myprofile/Created';

function Boardpage() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div>
          <div className={css.headerContents}>
            <span className={css.headerBdName}>보드 이름</span>
            <Dropdown fonticon={2}>
              <p>보드 옵션</p>
              <li>보드 수정</li>
              <li>병합</li>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={css.uiToolBox}>
        <div>
          <div className={css.iconBox}>
            <FontAwesomeIcon icon={faStar} className={css.faStar} />
          </div>
          <p>아이디어 더 보기</p>
        </div>
        <div>
          <div className={css.iconBox}>
            <FontAwesomeIcon
              icon={faSquareCheck}
              className={css.faSquareCheck}
            />
          </div>
          <p>정리하기</p>
        </div>
      </div>
      <div className={css.uiNav}>
        <div className={css.pinCnt}>핀 1개</div>
        <Dropdown fonticon={1} location={10}>
          <p>옵션 보기</p>
          <li>기본</li>
          <li>간단히</li>
        </Dropdown>
      </div>
      <div className={css.pinList}>
        <Created />
      </div>
      <div className={css.linkToPinW}>
        <div className={css.linkToPin}>
          이 보드를 위한 아이디어를 찾아 볼까요?
        </div>
      </div>
    </div>
  );
}

export default Boardpage;
