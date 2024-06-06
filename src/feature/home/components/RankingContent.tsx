import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Book from '../../../shared/components/Book';
import { PublicBook } from '../../../shared/types/book';
import { fetchRankingBooks } from '../functions/fetchRankingBooks';

const RankingContent: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<PublicBook[]>([]);

  useEffect(() => {
    const getBooks = async()=>{
      const datas: PublicBook[] = await fetchRankingBooks()
      setBooks(datas);
    }
    getBooks();
  }, []);


  const handleButton = () => {
    navigate("/books");
  }

  return (
    <Container>
      <Title>명예의 전당</Title>
      <BookList>
        {books.map((book) => (
          <Book key={book.id} state="done" content={book} storyId={book.id}/>
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