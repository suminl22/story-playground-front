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

const Bubble = styled.div<{ role: 'user' | 'assistant' }>`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${({ role }) => (role === 'user' ? '#ccc' : '#ffd700')};
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
`;

export default ChatBubble;
