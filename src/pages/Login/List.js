import React, { useState, useEffect } from 'ract';
import styled from 'styled-components';
import CheckTheme from './CheckTheme';
import BASE_URL from '../../config';

const List = () => {
  const [listNum, setListNum] = useState(0);
  const [checkT, setCheckT] = useState(false);
  const [themeList, setThemeList] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const token = localStorage.getItem('Authorization');

  //스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);
};
