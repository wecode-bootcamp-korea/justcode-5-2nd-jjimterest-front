import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScrollCircle from './ScrollCircle';

const LoginIntroduce = () => {
  const [order, setOrder] = useState(0);

  useEffect(() => {
    const changeOrderNumber = () => {
      if (order === TEXTS.length - 1) {
        clearTimeout(changeOrderNumber);
        setOrder(0);
        return;
      }
      setOrder(order + 1);
    };
    setTimeout(changeOrderNumber, 2000);
  }, [order]);

  return (
    <Introduce>
      <Next>다음</Next>
      <IntroduceLooking>
        <Text textsColor={TEXTS_COLOR[order]}>{TEXTS[order]}</Text>
        <Circles>
          {ORDER.map(selfOrder => {
            return (
              <CircleContainier key={selfOrder}>
                <ScrollCircle
                  selfOrder={selfOrder}
                  order={order}
                  textsColor={TEXTS_COLOR[order]}
                />
              </CircleContainier>
            );
          })}
        </Circles>
      </IntroduceLooking>
    </Introduce>
  );
};

export default LoginIntroduce;

const TEXTS = [
  '평일 저녁 식사 아이디어',
  '집안 꾸미기 아이디어',
  '새로운 패션 아이디어',
  '식물 재배 아이디어',
];

const TEXTS_COLOR = ['#e60023', 'blue', 'pink', 'orange'];

const ORDER = [0, 1, 2, 3];
const Introduce = styled.div`
  padding-top: 120px;
  text-align: center;
`;

const Next = styled.div`
  font-size: 60px;
  font-weight: bolder;
  color: ${props => props.theme.fontColor};
`;

const IntroduceLooking = styled.div`
  text-align: center;
`;

const Text = styled.div`
  margin: 20px 0 40px;
  color: ${props => props.textsColor};
  font-size: 60px;
  text-align: center;
`;

const Circles = styled.div`
  display: flex;
  justify-content: center;
`;

const CircleContainier = styled.div`
  margin-right: 10px;
`;
