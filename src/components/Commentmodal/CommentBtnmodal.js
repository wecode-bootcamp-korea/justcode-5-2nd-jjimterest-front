import React from 'react';
import styled from 'styled-components';
import BASE_URL from '../../config';

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

const CommentBtnmodal = ({ setOn, comment, pinId }) => {
  const canclebtn = () => {
    setOn(false);
  };

  const btnOff = () => {
    setOn(false);
    fetch(`${BASE_URL}comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjU4OTA1MjA0fQ.x_jRAVfJ1F72Z7gfmQOTspY5B3Hi8I-ko6_DFasLwnY',
      },
      body: JSON.stringify({
        parent_id: null,
        pin_id: pinId,
        content: comment,
      }),
    });
  };
  return (
    <Wrap>
      <Cancel onClick={canclebtn}>취소</Cancel>
      <Done onClick={btnOff}>완료</Done>
    </Wrap>
  );
};

export default CommentBtnmodal;
