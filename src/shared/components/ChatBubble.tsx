import React from 'react';
import styled from '@emotion/styled';

interface ChatBubbleProps {
  message: string;
  role: 'user' | 'assistant';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role }) => {
  return (
    <Bubble role={role}>
      {message}
    </Bubble>
  );
};

export default ChatBubble;

const Bubble = styled.div<{ role: 'user' | 'assistant' }>`
    background-color: ${({ role }) => (role === 'user' ? '#ffecb3' : '#e0e0e0')};
    color: ${({ role }) => (role === 'user' ? 'black' : 'black')};
    padding: 10px 15px;
    border-radius: 10px;
    max-width: 70%;
    margin: 10px 0;
    align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    word-break: break-word;
`;
