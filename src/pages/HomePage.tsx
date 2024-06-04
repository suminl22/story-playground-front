import React from 'react';
import Body from '../feature/home/components/Body';
import NavBar from '../feature/home/components/NavBar';
import Header from '../feature/home/components/Header';

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Body />
    </>
  );
}

export default HomePage;
