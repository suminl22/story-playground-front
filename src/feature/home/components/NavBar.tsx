import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem('token');
    alert('로그아웃 했습니다!');
    navigate('/');
  };

  return (
    <Nav>
      <Container>
        <Logo src="src/img/logo.png" alt='이야기 놀이터 이미지' />
        <LogoutButton onClick={onClick}>
          Logout
        </LogoutButton>
      </Container>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
`;

const Logo = styled.img`
  height: 40px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid #343a40;
  color: #343a40;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    background-color: #343a40;
    color: #fff;
  }
`;
