import React  from 'react';
import styled from '@emotion/styled';
import { NewWelcome } from '../feature/signUp/components/NewWelcome';
import SignUpForm from '../feature/signUp/components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <Container>
      <NewWelcome/>
      <SignUpForm />
    </Container>
  );
}

export default SignUp;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    gap: 20px;
`;
