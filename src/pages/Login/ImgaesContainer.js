import React from 'react';
import styled from 'styled-components';

const ImagesContainer = ({ imageMockData }) => {
  return (
    <Images>
      {imageMockData.map(info => {
        return <Image key={info.id} src={info.url} alt="image" />;
      })}
    </Images>
  );
};

export default ImagesContainer;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  justify-items: center;
  padding: 30px 50px 0;
  row-gap: 20px;
`;

const Image = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 20px;
`;
