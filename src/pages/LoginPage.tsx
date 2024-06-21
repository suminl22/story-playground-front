import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Welcome from '../feature/login/components/Welcome';
import LoginForm from '../feature/login/components/LoginForm';
import logoImg from '../assets/imgs/story_playground_image.png';
import logoText from '../assets/imgs/logoText.png';

const Login = () => {
  return (
    <Container>
      <ContentWrapper>
        <ImgContainer src={logoImg} alt="이야기 놀이터 이미지" />
        <LoginContainer>
          <LogoText src={logoText} alt="이야기 놀이터 텍스트 이미지" />
          <LoginForm />
          <Row>
            <span>처음이신가요? </span>
            <Link to={'/signUp'}>회원가입하기</Link>
          </Row>
        </LoginContainer>
      </ContentWrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch; /* Align items to stretch to the same height */
    width: 90%;
    max-width: 1100px;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #f0f2f5;
    padding: 20px;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 45%;
    max-width: 550px;
    align-self: stretch;
`;

const ImgContainer = styled.img`
    width: 45%;
    max-width: 550px;
    height: auto;
    aspect-ratio: 4 / 3;
    display: block;
    border-radius: 10px 0 0 10px;
    align-self: stretch; /* Ensure the container stretches to the full height */

    @media (max-width: 800px) {
        display: none;
    }
`;

const LogoText = styled.img`
    height: 80px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 10px;
    font-size: 18px;
`;
