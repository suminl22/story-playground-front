import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Book from '../shared/components/Book';
import { PublicBook } from '../shared/types/book';
import { fetchCategory } from '../feature/books/functions/fetchCategory';
import { fetchBooks } from '../feature/books/functions/fetchBooks';

const BooksPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(['all']);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [activeFilter, setActiveFilter] = useState<'좋아요순' | '최신순'>('좋아요순');
  const [books, setBooks] = useState<PublicBook[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const datas: string[] = await fetchCategory();
      setCategories((prevCategories) => [...prevCategories, ...datas]);
    };
    getCategories();

    return () => setCategories(['all']);
  }, []);

  useEffect(() => {
    let filterName = '';
    if (activeFilter === '좋아요순') {
      filterName = 'like';
    } else {
      filterName = 'recent';
    }

    const getBooks = async () => {
      const datas: PublicBook[] = await fetchBooks(activeCategory, filterName);
      setBooks(datas);
    };
    getBooks();

    return () => setBooks([]);
  }, [activeCategory, activeFilter]);

  return (
    <PageContainer>
      <NavBar>
        {categories.map((category) => (
          <NavButton
            key={category}
            isActive={category === activeCategory}
            onClick={() => {
              setActiveCategory(category);
              setActiveFilter('좋아요순')
            }}
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
        {books.map((book) => (
          <BookWrapper key={book.id}>
            <Book state="done" content={book} storyId={book.id} />
          </BookWrapper>
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
    background-color: #fcf06e;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 20px;
    overflow-x: auto;
    white-space: nowrap;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const NavButton = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? '#ffd700' : 'transparent')};
    border: none;
    color: ${({ isActive }) => (isActive ? 'black' : '#666')};
    font-weight: bold;
    font-family: 'Hakgyoansim';
    font-size: 1.4rem;
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    white-space: nowrap;

    &:hover {
        background-color: #ffcc00;
        color: black;
    }

    @media (max-width: 768px) {
        font-size: 1.2rem;
        padding: 5px 10px;
        margin: 0 5px;
    }
`;

const FilterBar = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 20px 40px 10px 0;

    @media (max-width: 768px) {
        margin: 10px 20px 10px 0;
    }
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
    background: none;
    border: none;
    color: ${({ isSelected }) => (isSelected ? 'black' : '#666')};
    font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
    text-decoration: ${({ isSelected }) => (isSelected ? 'underline' : 'none')};
    font-family: 'Hakgyoansim';
    font-size: 1.4rem;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        font-size: 1.2rem;
        margin-left: 10px;
    }
`;

const BooksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    width: 100%;
    justify-content: center;
`;

const BookWrapper = styled.div`
    flex: 1 1 300px;
    max-width: 300px;
    box-sizing: border-box;
    padding: 10px;
`;
