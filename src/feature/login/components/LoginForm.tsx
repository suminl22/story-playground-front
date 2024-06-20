import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../functions/postLogin';

const LoginForm:React.FC = ()=>{
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await postLogin(username, password);

    if(result === true){
      navigate("/home");
    } else if(result === false){
      setError("아이디 혹은 비밀번호가 틀렸습니다!");
    } else{
      alert(result);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="아이디 입력"
          />
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호 입력"
          />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">로그인</Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: fit-content;
    padding: 20px;
`

const Input = styled.input`
    width: 95%;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 24px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #FFD700;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    background-color: #FFD700;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    color: black;

    &:hover {
        background-color: #FCF06E;
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;


export default LoginForm;