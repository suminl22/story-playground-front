import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Welcome from '../feature/login/components/Welcome';
import LoginForm from '../feature/login/components/LoginForm';

const Login = () => {

  return (
    <Container>
      <Welcome />
      <LoginForm />
      <Row>
        <span>처음이신가요? </span>
        <Link to={'/signUp'}>회원가입하기</Link>
      </Row>
    </Container>
  );
}

export default Login;

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
    font-family: Arial, sans-serif;
    gap: 20px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

