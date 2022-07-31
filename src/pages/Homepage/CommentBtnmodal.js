import React from 'react';
import styled from 'styled-components';
import BASE_URL from '../../config';
import { token } from '../../components/Nav/Nav';

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

const CommentBtnmodal = ({ setOn, comment, pinId, setComment }) => {
  const canclebtn = () => {
    setOn(false);
    setComment('');
  };

  const btnOff = () => {
    setOn(false);
    fetch(`${BASE_URL}comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        parent_id: null,
        pin_id: pinId,
        content: comment,
      }),
    }).then(setComment(''));
  };
  return (
    <Wrap>
      <Cancel onClick={canclebtn}>취소</Cancel>
      <Done onClick={btnOff}>완료</Done>
    </Wrap>
  );
};

export default CommentBtnmodal;
