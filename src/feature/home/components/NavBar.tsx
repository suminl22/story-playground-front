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

  const easterEgg = () => {
    alert('안녕! 나는 야기! 영어 이름은 YAGI~ 나는 너와 함께 이야기를 만들어나가는게 세상에서 제일 재밌고 신나ㅎㅎ 여기 이야기 놀이터에서 너의 상상력을 마음껏 펼쳐봐:)')
  }

  return (
    <Nav>
      <Logo src={logoTextImg} alt='이야기 놀이터 이미지' onClick={easterEgg}/>
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
    padding: 16px 24px 16px 24px;
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
