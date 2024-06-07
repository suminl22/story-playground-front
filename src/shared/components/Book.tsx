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
          <Date>{(content as CompletedBook).createdAt}</Date>
          {'author' in content && <Author>작가 : {(content as PublicBook).author}</Author>}
          {'category' in content && <Category>주제 : {(content as PublicBook).category}</Category>}
          {'likeNum' in content && (
            <Row>
              <Number>좋아요 : {(content as PublicBook).likeNum}개</Number>
              <Number>싫어요 : {(content as PublicBook).dislikeNum}개</Number>
            </Row>
          )}
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
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    border-radius: 10px;
    padding: 20px 40px;
    background-color: beige;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
`;

const BookCover = styled.div`
    width: 180px;
    height: 220px;
    display: flex;
    background: antiquewhite;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
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
    gap: 20px;
`;

const Number = styled.span`
    margin-top: 5px;
    font-size: 0.9rem;
    color: #333;
`;

export default Book;
