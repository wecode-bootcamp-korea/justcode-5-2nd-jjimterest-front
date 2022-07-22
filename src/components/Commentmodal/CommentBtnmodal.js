import React from 'react';
import styled from 'styled-components';

export const Cancel = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 40%;
  border: none;
  font-size: medium;
  font-weight: bold;
  &:hover {
    background-color: grey;
  }
`;

export const Done = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 40%;
  border: none;
  font-size: medium;
`;

export const Wrap = styled.div`
  display: flex;
  position: absolute;
  right: 5%;
  bottom: 5%;
`;

const CommentBtnmodal = ({ setOn }) => {
  const btnOff = () => {
    setOn(false);
  };
  return (
    <Wrap>
      <Cancel onClick={btnOff}>취소</Cancel>
      <Done onClick={btnOff}>완료</Done>
    </Wrap>
  );
};

export default CommentBtnmodal;
