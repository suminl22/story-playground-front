import React from 'react';
import Body from '../feature/home/components/Body';
import NavBar from '../feature/home/components/NavBar';
import RankingContent from '../feature/home/components/RankingContent';
import CreateContent from '../feature/home/components/CreateContent';
import styled from '@emotion/styled';

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      {/*나중에 slider로 ranking이랑 created을 content로 보여주기*/}
      <CreateContent />
      <RankingContent />
      <Body />
    </>
  );
}

export default HomePage;
