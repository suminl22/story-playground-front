import React, { useState, useEffect } from 'react';
import Book from '../components/Book';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { client } from '../../../shared/remotes/axios';

interface Story {
  id: number;
  title: string;
}

const Body: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('작성중');
  const [stories, setStories] = useState<Story[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStories = async () => {
      try {
        const response = await client.get<Story[]>(`/story/user/incomplete`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        let data = response.data;
        console.log(data);
        data = data.map((story, index) => ({
          ...story,
          title: `story#${index + 1}`
        }));
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleEditClick = (storyId: number) => {
    localStorage.setItem('currentStoryId', storyId.toString());
    navigate('/chat');
  };

  const renderBooks = () => {
    return stories.map((story) => (
      <div className="col mb-5" key={story.id}>
        <Book
          action="edit"
          title={story.title}
          onEdit={() => handleEditClick(story.id)}
        />
      </div>
    ));
  };

  return (
    <>
      <Container>
        <NavTabs>
          <NavItem>
            <NavButton
              active={activeTab === '작성중'}
              onClick={() => setActiveTab('작성중')}
            >
              작성중
            </NavButton>
          </NavItem>
          <NavItem>
            <NavButton
              active={activeTab === '작성완료'}
              onClick={() => setActiveTab('작성완료')}
            >
              작성완료
            </NavButton>
          </NavItem>
        </NavTabs>
      </Container>
      <Section>
        <div className="container px-4 px-lg-5 mt-1">
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-start">
            {renderBooks()}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Body;

const Container = styled.div`
  margin-top: 1rem;
  padding-top: 20px;
`;

const NavTabs = styled.ul`
  width: 100%;
  display: flex;
`;

const NavItem = styled.li`
  flex: 1;
`;

const NavButton = styled.button<{ active: boolean }>`
  width: 90%;
  margin: 0 auto;
  background-color: ${({ active }) => (active ? '#FCF06E' : 'white')};
  color: black;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  &:focus {
    outline: none;
  }
`;

const Section = styled.section`
  padding: 2rem 0;
`;
