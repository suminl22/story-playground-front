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

      if (incompletedData !== '') {
        setIncompletedBooks(incompletedData);
      }

      if (completedData !== '') {
        setCompletedBooks(completedData);
      }
    };

    fetchData();
  }, []);

  const renderBooks = () => {
    if (activeTab === '작성중') {
      return incompletedBooks.length > 0 ? (
        incompletedBooks.map((book) => (
          <Book key={book.id} state="edit" content={book} />
        ))
      ) : (
        <EmptyMessage>텅~</EmptyMessage>
      );
    } else {
      return completedBooks.length > 0 ? (
        completedBooks.map((book) => (
          <Book key={book.id} state="done" content={book} />
        ))
      ) : (
        <EmptyMessage>텅~</EmptyMessage>
      );
    }
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
        <div className="container px-4 px-lg-5 mt-1">
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-start">
            {renderBooks()}
          </div>
        </div>
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
    justify-content: space-evenly;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
`;

const NavItem = styled.li`
    list-style: none;
    width: 45%;
    text-align: center;
`;

const NavButton = styled.button<{ active: boolean }>`
    width: 100%; // 부모의 100% 차지
    background-color: ${({ active }) => (active ? '#FCF06E' : 'white')};
    color: black;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    border: none;
    border-bottom: ${({ active }) => (active ? '2px solid black' : 'none')};
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s, border-bottom 0.3s;

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
