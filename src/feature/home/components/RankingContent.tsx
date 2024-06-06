import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Book from '../../../shared/components/Book';
import { PublicBook } from '../../../shared/types/book';

const RankingContent: React.FC = () => {
  const navigate = useNavigate();

  const dummyBooks: PublicBook[] = [
    {
      id: 0,
      title: '첫 번째 책',
      createdAt: '2024-06-06',
      author: '민수',
      category: '효도',
      likeNum: 123,
      dislikeNum: 2,
    },
    {
      id: 1,
      title: '두 번째 책',
      createdAt: '2024-06-05',
      author: '서노',
      category: '우애',
      likeNum: 11,
      dislikeNum: 4,
    },
    {
      id: 2,
      title: '세 번째 책',
      createdAt: '2024-05-23',
      author: '재훈',
      category: '사랑',
      likeNum: 1,
      dislikeNum: 5,
    },
  ]

  const handleButton = () => {
    navigate("/books");
  }

  return (
    <Container>
      <Title>명예의 전당</Title>
      <BookList>
        {dummyBooks.map((book) => (
          <Book key={book.id} state="done" content={book} />
        ))}
      </BookList>
      <Button onClick={handleButton}>
        이야기 둘러보기
      </Button>
    </Container>
  );
}

export default RankingContent;

const Container = styled.div`
    padding: 20px 0 !important;
    background-color: #FCF06E;
    text-align: center;
    @media (min-width: 992px) {
        padding: 0 2rem;
    }
    gap: 10px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bolder;
    color: black;
`;

const BookList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #FFD700;
    width: 300px;
    
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
    margin-bottom: 10px;
    
`;