import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import { client } from '../shared/remotes/axios';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await client.post('/login', formData);

      if (response.status === 200) {
        alert("환영합니다!");
        saveTokenToLocalStorage(response.headers['authorization']);
        navigate('/home');
      } else {
        setError('아이디 혹은 비밀번호가 다릅니다...!');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      setError('아이디 혹은 비밀번호가 다릅니다');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <LoginContainer>
      <h1>Story Playground</h1>
      <span>에 오신 것을 환영합니다:)</span>
      <Spacer />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputWrapper>
              <Input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="사용자 아이디"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호"
              />
            </InputWrapper>
          </InputContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">로그인</Button>
        </form>
      </FormContainer>
      <Spacer />
      <div>
        <span>처음이신가요? </span>
        <Link to={'/signUp'}>회원가입하기</Link>
      </div>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f0f2f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
`;

const FormContainer = styled.div`
    background-color: white;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 300px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    margin-bottom: 15px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 10px;
`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    background-color: #FFD700;
    color: black;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #FCF06E;
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;

const Spacer = styled.div`
    height: 20px;
    width: 100%;
`;
