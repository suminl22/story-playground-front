import React, { useState } from 'react';
import styled from '@emotion/styled';
import Book from '../shared/components/Book';
import { PublicBook } from '../shared/types/book';

const BooksPage: React.FC = () => {
  const categories: string[] = ['전체', '사랑', '효도', '우정'];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [activeFilter, setActiveFilter] = useState<'좋아요순' | '최신순'>('좋아요순');

  const dummyBooks: PublicBook[] = Array.from({ length: 11 }, (_, index) => ({
    id: index,
    title: `Dummy Book ${index + 1}`,
    createdAt: '2024-06-06',
    author: `Author ${index + 1}`,
  }));

  // 책들을 3개씩 RowContainer에 배치
  const rows = [];
  for (let i = 0; i < dummyBooks.length; i += 3) {
    rows.push(dummyBooks.slice(i, i + 3));
  }

  return (
    <PageContainer>
      <NavBar>
        {categories.map((category) => (
          <NavButton
            key={category}
            isActive={category === activeCategory}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </NavButton>
        ))}
      </NavBar>
      <FilterBar>
        <FilterButton
          isSelected={activeFilter === '좋아요순'}
          onClick={() => setActiveFilter('좋아요순')}
        >
          좋아요순
        </FilterButton>
        <FilterButton
          isSelected={activeFilter === '최신순'}
          onClick={() => setActiveFilter('최신순')}
        >
          최신순
        </FilterButton>
      </FilterBar>
      <BooksContainer>
        {rows.map((row, rowIndex) => (
          <RowContainer key={rowIndex}>
            {row.map((book) => (
              <BookWrapper key={book.id}>
                <Book state="done" content={book} />
              </BookWrapper>
            ))}
          </RowContainer>
        ))}
      </BooksContainer>
    </PageContainer>
  );
};

export default BooksPage;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const NavBar = styled.nav`
    background-color: #FCF06E;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 20px;
`;

const NavButton = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? '#ffd700' : 'transparent')};
    border: none;
    color: ${({ isActive }) => (isActive ? 'black' : '#666')};
    font-weight: bold;
    font-size: 16px;
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #ffcc00;
        color: black;
    }
`;

const FilterBar = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 20px;
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
    background: none;
    border: none;
    color: ${({ isSelected }) => (isSelected ? 'black' : '#666')};
    font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
    font-size: 16px;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const BooksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center;
`;

const RowContainer = styled.div`
    background-color: #E9ECEF;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin: 10px;
    padding: 10px;
    border-radius: 6px;
    box-sizing: border-box;
`;


const BookWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
`;
