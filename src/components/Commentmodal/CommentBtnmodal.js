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
  const btnOff = () => {
    setOn(false);
    console.log('버튼테스트', comment, pinId);

    fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU4MzEzMzkwfQ.MqiZkp3H0yn_33JS4Te3sPJ84NhsFtTL4dNtATvlyDE',
      },
      body: JSON.stringify({
        parent_id: null,
        pin_id: pinId,
        content: comment,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };
  return (
    <Wrap>
      <Cancel onClick={btnOff}>취소</Cancel>
      <Done onClick={btnOff}>완료</Done>
    </Wrap>
  );
};

export default CommentBtnmodal;
