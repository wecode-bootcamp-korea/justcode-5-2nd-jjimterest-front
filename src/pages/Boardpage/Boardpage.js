import React, { useEffect, useRef, useState } from 'react';
import css from './Boardpage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

function Boardpage() {
  const creRef = useRef();
  const [createDisplay, setCreateDisplay] = useState(false);
  useEffect(() => {
    document.addEventListener('mousedown', clickCreOutside);

    return () => {
      document.removeEventListener('mousedown', clickCreOutside);
    };
  });
  const clickCreOutside = event => {
    if (createDisplay && !creRef.current.contains(event.target)) {
      setCreateDisplay(false);
    }
  };

  const Create = styled.div`
    display: ${createDisplay ? 'block' : 'none'};
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: white;
    min-width: 160px;
    border-radius: 15px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  `;
  const onClickCreate = () => {
    return createDisplay ? setCreateDisplay(false) : setCreateDisplay(true);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div>
          <div>
            <span>보드 이름</span>
            <span>
              <FontAwesomeIcon icon={faEllipsis} className={css.headerTool} />
            </span>
          </div>
          <div>참여자 초대</div>
        </div>
      </div>
      <div>UI툴</div>
      <div>
        <div className={css.boardUi}>
          <div>핀 1개</div>
          <div
            className={`${css.iconWrapper} ${css.createBtn}`}
            onClick={onClickCreate}
          >
            <FontAwesomeIcon icon={faEquals} className={css.icon} />
            <Create ref={creRef}>
              <p>옵션 보기</p>
              <li>기본</li>
              <li>간단히</li>
            </Create>
          </div>
        </div>
      </div>
      <div>핀 목록</div>
    </div>
  );
}

export default Boardpage;
