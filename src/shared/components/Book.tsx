import React from 'react';
import styled from '@emotion/styled';
import puangImg from '../../assets/imgs/puang.png';
import { CompletedBook, IncompletedBook, PublicBook } from '../types/book';

interface BookProps {
  state: "edit" | "done";
  content: IncompletedBook | CompletedBook | PublicBook;
}

const Book: React.FC<BookProps> = ({ state, content }) => {
  const handleClick = () => {
    console.log(`Clicked on book with ID: ${content.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <BookCover>
        <img src={puangImg} alt="Book Cover" />
      </BookCover>
      <Title>{content.title}</Title>
      {state === "done" ? (
        <Date>{(content as CompletedBook).createdAt}</Date>
      ) : (
        <Date>{(content as IncompletedBook).modifiedAt}</Date>
      )}
      {Object.prototype.hasOwnProperty.call(content, 'author') && (
        <Author>작가 : {(content as PublicBook).author}</Author>
      )}
      {Object.prototype.hasOwnProperty.call(content, 'category') && (
        <Category>주제 : {(content as PublicBook).category}</Category>
      )}
      {Object.prototype.hasOwnProperty.call(content, 'likeNum') && (
        <Row>
          <Number>좋아요 : {(content as PublicBook).likeNum}개</Number>
          <Number>싫어요 : {(content as PublicBook).dislikeNum}개</Number>
        </Row>
      )}
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
`;

const BookCover = styled.div`
    width: 180px;
    height: 220px;
    display: flex;
    background: antiquewhite;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Title = styled.span`
    margin-top: 10px;
    font-size: 22px;
    font-weight: bolder;
`;

const Date = styled.span`
    margin-top: 5px;
    font-size: 0.9rem;
    color: #666;
`;

const Author = styled.span`
    margin-top: 5px;
    font-size: 0.9rem;
    color: #333;
`;

const Category = styled.span`
    margin-top: 5px;
    font-size: 0.9rem;
    color: #333;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap:20px;
`

const Number = styled.span`
    margin-top: 5px;
    font-size: 0.9rem;
    color: #333;
`
export default Book;
