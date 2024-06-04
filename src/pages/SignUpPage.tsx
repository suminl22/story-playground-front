import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import { client } from '../shared/remotes/axios';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAuthCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await client.post('/register/user', {
        username: username,
        password: password
      });

      if (response.data === true) {
        alert("축하합니다! 회원가입이 완료되었습니다!");
        setError('');
        navigate('/');
      } else {
        setError('이미 존재하는 아이디입니다.');
      }
    } catch (error) {
      console.error('회원가입 요청 실패:', error);
      setError('회원가입 요청에 실패했습니다.');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSignUp();
  };

  return (
    <SignUpContainer>
      <SignUpBox>
        <h1>이야기 놀이터가 처음이신가요?</h1>
        <span>놀이터에 입장하기 위하여 회원가입을 진행해주세요:)</span>
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
          <Button type="submit">회원가입하기</Button>
        </form>
      </SignUpBox>
    </SignUpContainer>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const SignUpBox = styled.div`
    text-align: center;
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
