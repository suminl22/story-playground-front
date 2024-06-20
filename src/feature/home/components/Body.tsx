import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { fetchIncompletedBooks } from '../functions/fetchIncompletedBooks';
import { fetchCompletedBooks } from '../functions/fetchCompletedBooks';
import { IncompletedBook, CompletedBook } from '../../../shared/types/book';
import Book from '../../../shared/components/Book';

const Body: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'작성중' | '작성완료'>('작성중');
  const [incompletedBooks, setIncompletedBooks] = useState<IncompletedBook[]>([]);
  const [completedBooks, setCompletedBooks] = useState<CompletedBook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const incompletedData = await fetchIncompletedBooks();
      const completedData = await fetchCompletedBooks();

      if (incompletedData) {
        setIncompletedBooks(incompletedData);
      }

      if (completedData) {
        setCompletedBooks(completedData);
      }
    };

    fetchData();
  }, []);

  const renderBooks = () => {
    const booksToRender = activeTab === '작성중' ? incompletedBooks : completedBooks;
    const rows = [];

    for (let i = 0; i < booksToRender.length; i += 3) {
      rows.push(booksToRender.slice(i, i + 3));
    }

    return booksToRender.length > 0 ? (
      <BooksContainer>
        {rows.map((row, rowIndex) => (
          <RowContainer key={rowIndex}>
            {row.map((book) => (
              <BookWrapper key={book.id}>
                <Book state={activeTab === '작성중' ? 'edit' : 'done'} content={book} storyId={book.id} />
              </BookWrapper>
            ))}
          </RowContainer>
        ))}
      </BooksContainer>
    ) : (
      <EmptyMessage>텅~</EmptyMessage>
    );
  };

  return (
    <>
      <Container>
        <NavTabs>
          <NavItem>
            <NavButton
              active={activeTab === '작성중'}
              onClick={() => setActiveTab('작성중')}
            >
              작성중
            </NavButton>
          </NavItem>
          <NavItem>
            <NavButton
              active={activeTab === '작성완료'}
              onClick={() => setActiveTab('작성완료')}
            >
              작성완료
            </NavButton>
          </NavItem>
        </NavTabs>
      </Container>
      <Section>
        {renderBooks()}
      </Section>
    </>
  );
};

export default Body;

const Container = styled.div`
    margin-top: 1rem;
    padding-top: 20px;
`;

const NavTabs = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
`;

const NavItem = styled.li`
    list-style: none;
    width: 45%;
    text-align: center;
`;

const NavButton = styled.button<{ active: boolean }>`
    width: 100%;
    background-color: ${({ active }) => (active ? '#FCF06E' : 'white')};
    color: black;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    border: none;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s, border-bottom 0.3s;
    font-size: 1.4rem;
    font-family: 'Hakgyoansim';

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: #f0e68c;
    }
`;

const Section = styled.section`
    padding: 2rem 0;
`;

const EmptyMessage = styled.div`
    text-align: center;
    color: #888;
    font-size: 1.2rem;
    padding: 2rem;
`;

const BooksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center;
`;

const RowContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    background-color: #E9ECEF;
    border-radius: 6px;
    box-sizing: border-box;
`;

const BookWrapper = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
`;

