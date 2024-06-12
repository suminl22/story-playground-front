import React from 'react';
import styled from '@emotion/styled';

const Welcome:React.FC = ()=>{
  return(
    <Container>
      <h1>Story Playground</h1>
      <span>에 오신 것을 환영합니다:)</span>
    </Container>
  )
}

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default Welcome;