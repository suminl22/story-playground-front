import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Book from '../../../shared/components/Book';

const CreateContent: React.FC = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/chat");
  }

  return (
    <Container>
      <Column>
        <SubTitle>
          생성형 이야기 챗봇 &apos;야기&apos;과 함께
        </SubTitle>
        <SubTitle>
          세상에 단 하나 뿐인 나만의 동화책을 만들어보세요!
        </SubTitle>
      </Column>
      <StartButton onClick={handleButton}>
        이야기 시작하기
      </StartButton>
    </Container>
  );
}

export default CreateContent;

const Container = styled.div`
    padding: 20px 0 !important;
    background-color: #E9ECEF;
    text-align: center;
    @media (min-width: 992px) {
        padding: 0 2rem;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const SubTitle = styled.span`
    font-size: 1.6rem;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
`
const StartButton = styled.button`
    height: 50px;
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
    font-size: 1.6rem;
    font-family: 'Hakgyoansim';
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`;
