import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoTextImg from '../../../assets/imgs/logoText.png';
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
      <Logo src={logoTextImg} alt='이야기 놀이터 이미지' />
      <LogoutButton onClick={onClick}>
        Logout
      </LogoutButton>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    padding: 16px 20px 16px 20px;
`;

const Logo = styled.img`
    height: 50px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid #343a40;
  color: #343a40;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  border-radius: 0.25rem;
    font-size: 16px;
  &:hover {
    background-color: #343a40;
    color: #fff;
  }
`;
