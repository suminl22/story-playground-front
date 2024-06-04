import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface BookProps {
  action: 'edit' | 'read';
  title: string;
  onEdit: ()=>void;
}

const Book: React.FC<BookProps> = ({ action, title }) => {
  let imageSrc: string;
  let btn = '기본';

  // Set image source and button text based on action
  if (action === 'edit') {
    imageSrc = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
    btn = '수정하기';
  } else if (action === 'read') {
    imageSrc = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
    btn = '열람하기';
  } else {
    // Fallback image for invalid action
    imageSrc = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
  }

  return (
    <Card>
      <CardImage src={imageSrc} alt="..." />
      <CardBody>
        <TextCenter>
          <CardTitle>{title}</CardTitle>
        </TextCenter>
      </CardBody>
      <CardFooter>
        <TextCenter>
          <StyledLink
            to="/chat"
          >
            {btn}
          </StyledLink>
        </TextCenter>
      </CardFooter>
    </Card>
  );
}

export default Book;

const Card = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const CardTitle = styled.h5`
  font-weight: bolder;
`;

const CardFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #ddd;
  background: #f8f9fa;
`;

const StyledLink = styled(Link)`
  background-color: #FFD700;
  border: none;
  color: black;
  font-size: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease;
  text-decoration: none;
  display: inline-block;
  padding: 0.5rem 1rem;

  &:hover {
    transform: scale(1.05);
  }
`;
