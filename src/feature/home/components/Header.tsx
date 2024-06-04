import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/chat");
  }

  return (
    <StyledHeader>
      <Container>
        <TextCenter>
          <Title>야기야 노올자</Title>
          <Subtitle>생성형 이야기 챗봇 &apos;야기&apos;과 함께</Subtitle>
          <Subtitle>세상에 단 하나 뿐인 나만의 동화책을 만들어보세요!</Subtitle>
          <StartButton onClick={handleButton}>
            이야기 시작하기
          </StartButton>
        </TextCenter>
      </Container>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
    padding: 1rem 0;
    background-color: #FCF06E;
`;

const Container = styled.div`
    padding: 0 1rem;
    margin: 2rem 0;
    @media (min-width: 992px) {
        padding: 0 2rem;
    }
`;

const TextCenter = styled.div`
    text-align: center;
    color: black;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bolder;
`;

const Subtitle = styled.p`
    font-size: 1.25rem;
    font-weight: normal;
    color: #6c757d;
    margin-bottom: 1rem;
`;

const StartButton = styled.button`
    background-color: #FFD700;
    border: none;
    color: black;
    font-weight: bold;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease;
    text-decoration: none;
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    &:hover {
        transform: scale(1.05);
    }
`;
