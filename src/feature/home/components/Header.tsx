import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Book from '../../../shared/components/Book';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/books");
  }

  return (
    <Container>
      <Title>야기야 노올자</Title>
      <SubTitle>
        생성형 이야기 챗봇 &apos;` 야기 &apos;`과 함께
        세상에 단 하나 뿐인 나만의 동화책을 만들어보세요!
      </SubTitle>
      <StartButton onClick={handleButton}>
        이야기 시작하기
      </StartButton>
    </Container>
  );
}

export default Header;

const Container = styled.div`
    padding: 20px 0 !important;
    background-color: #FCF06E;
    text-align: center;
    @media (min-width: 992px) {
        padding: 0 2rem;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bolder;
    color: black;
`;

const SubTitle = styled.p`
    font-size: 1rem;
    color: darkgray;
`

const StartButton = styled.button`
    background-color: #FFD700;
    border: none;
    color: black;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease;
    text-decoration: none;
    display: inline-block;
    padding: 0.8rem 1.4rem;
    font-size: 1.25rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`;