import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {
  faPlus,
  faEquals,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import css from './Dropdown.module.scss';

function Dropdown({ children, fonticon, location }) {
  let iconlist = [faPlus, faEquals, faEllipsis];
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
  const onClickCreate = () => {
    return createDisplay ? setCreateDisplay(false) : setCreateDisplay(true);
  };
  const Create = styled.div`
    display: ${createDisplay ? 'block' : 'none'};
    position: absolute;
    top: 60px;
    right: ${location}px;
    background-color: white;
    min-width: 160px;
    border-radius: 15px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  `;

  return (
    <div
      className={`${css.iconWrapper} ${css.createBtn}`}
      onClick={onClickCreate}
    >
      <FontAwesomeIcon icon={iconlist[fonticon]} className={css.icon} />
      <Create ref={creRef}>{children}</Create>
    </div>
  );
}

export default Dropdown;
