import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { postSignUp } from '../functions/postSignUp';

const SignUpForm:React.FC = () => {
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
    const result = await postSignUp(username, password);

    if(result === true){
      alert('축하합니다! 계정을 생성하였습니다!')
      navigate("/login");
    } else if(result === false){
      setError("아이디 혹은 비밀번호가 틀렸습니다!");
    } else{
      alert(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">회원가입하기</Button>
      </Container>
    </form>
  );
}


const Container = styled.div`
    background-color: white;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const InputWrapper = styled.div`
    margin-bottom: 15px;
`;

const Input = styled.input`
    width: 250px;
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

export default SignUpForm;

