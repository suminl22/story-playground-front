import React from 'react';
import styled from '@emotion/styled';
import puangImg from '../../assets/imgs/puang.png';
import { CompletedBook, IncompletedBook } from '../types/book';

interface BookProps {
  state: "edit" | "done";
  content: IncompletedBook | CompletedBook;
}

const Book: React.FC<BookProps> = ({ state, content }) => {
  const handleClick = () => {
    console.log(`Clicked on book with ID: ${content.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <BookCover>
        {/* todo: 카드 이미지 넣기 */}
        <img src={puangImg} alt="Book Cover" />
      </BookCover>
      <Title>{content.title}</Title>
      {state === "done" ? (
        <Date>{(content as CompletedBook).createdAt}</Date>
      ) : (
        <Date>{(content as IncompletedBook).modifiedAt}</Date>
      )}
    </Container>
  );
};

const Container = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const BookCover = styled.div`
    width: 180px;
    height: 220px;
    display: flex;
    background: antiquewhite;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Title = styled.h3`
    margin-top: 10px;
`;

const Date = styled.p`
  margin-top: 5px;
  font-size: 0.9rem;
  color: #666;
`;

export default Book;
