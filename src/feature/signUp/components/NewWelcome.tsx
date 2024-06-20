import React from 'react';
import styled from '@emotion/styled';

export const NewWelcome: React.FC = ()=>{
  return (
    <Container>
      <h1>이야기 놀이터가 처음이신가요?</h1>
      <span>놀이터에 입장하기 위하여 회원가입을 진행해주세요:)</span>
    </Container>
  );
}

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`