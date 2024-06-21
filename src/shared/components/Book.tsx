import React from 'react';
import styled from '@emotion/styled';
import puangImg from '../../assets/imgs/puang.png';
import { CompletedBook, IncompletedBook, PublicBook } from '../types/book';
import { useNavigate } from 'react-router-dom';

interface BookProps {
  state: "edit" | "done";
  content: IncompletedBook | CompletedBook | PublicBook;
  storyId: number;
}

const Book: React.FC<BookProps> = ({ state, content, storyId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (state === 'edit') {
      navigate(`/edit/${storyId}`);
    } else if(state === 'done'){
      navigate(`/read/${storyId}`);
    }
  };

  return (
    <Container onClick={handleClick}>
      <BookCover>
        <img src={puangImg} alt="Book Cover" />
      </BookCover>
      <Title>{content.title}</Title>
      {state === "done" ? (
        <>
          {'category' in content && <Category>주제 : {(content as PublicBook).category}</Category>}
          {'author' in content && <Author>작가 : {(content as PublicBook).author}</Author>}
          {'likeNum' in content && (
            <Row>
              <Number>👍 : {(content as PublicBook).likeNum}개</Number>
              <Number>👎 : {(content as PublicBook).dislikeNum}개</Number>
            </Row>
          )}
          <Date>{(content as CompletedBook).createdAt}</Date>
        </>
      ) : (
        <Date>{(content as IncompletedBook).modifiedDate}</Date>
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
    max-width: 300px;
    max-height: 100vh;
    overflow: hidden;
    border-radius: 10px;
    padding: 20px 40px;
    background-color: beige;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
`;

const BookCover = styled.div`
    width: 170px;
    height: 210px;
    display: flex;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Title = styled.span`
    margin-top: 14px;
    font-size: 1.6rem;
    font-weight: bolder;
`;

const Date = styled.span`
    margin-top: 10px;
    font-size: 1rem;
    color: #666;
`;

const Author = styled.span`
    margin-top: 5px;
    font-size: 1.2rem;
    color: #333;
`;

const Category = styled.span`
    margin-top: 5px;
    font-size: 1.2rem;
    color: #333;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const Number = styled.span`
    margin-top: 5px;
    font-size: 1.2rem;
    color: #333;
`;

export default Book;
