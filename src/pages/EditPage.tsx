import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchFirstSentence } from '../feature/chat/components/fetchFirstSentence';
import { useRecoilState } from 'recoil';
import { chatState } from '../recoil/chat/chat';
import ChatBubble from '../shared/components/ChatBubble';
import { message } from '../shared/types/message';
import { fetchPreviousSentences } from '../feature/chat/components/fetchPreviousSentences';

const EditPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [messages, setMessages] = useRecoilState<message[]>(chatState);
  const messagesRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const previousSentences = await fetchPreviousSentences();

      if (previousSentences !== null) {
        const formattedMessages: message[] = previousSentences.map((sentence, index) => ({
          role: index % 2 === 0 ? 'assistant' : 'user',
          content: sentence
        }));

        setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setMessages]);


  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesRef.current && isAtBottomRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (messagesRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
        isAtBottomRef.current = scrollTop + clientHeight >= scrollHeight;
      }
    };

    if (messagesRef.current) {
      messagesRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (messagesRef.current) {
          messagesRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isComposing) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const input = document.getElementById('message-input') as HTMLTextAreaElement;
    const messageText = input.value.trim();
    if (messageText !== '') {
      const userMessage: message = { role: 'user', content: messageText };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      input.value = '';
    }
  };

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Sidebar>
        <HomeTextButton onClick={handleClick}>돌아가기</HomeTextButton>
      </Sidebar>
      <MainContent>
        <ChatArea ref={messagesRef}>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message.content} role={message.role} />
          ))}
          {isLoading && <ChatBubble key="loading" message="문장을 만들고 있어용..." role="assistant" />}
        </ChatArea>
        <InputArea>
          <MessageInput
            id="message-input"
            placeholder="다음 이야기를 입력해줘"
            onKeyDown={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <SendButton onClick={sendMessage}>입력</SendButton>
        </InputArea>
      </MainContent>
    </Container>
  );
};

export default EditPage;

const Container = styled.div`
    background-color: #eff3f7;
    display: flex;
    height: 100vh;
    border-radius: 5px;
`;

const Sidebar = styled.div`
    height: 100vh;
    width: 15%;
    background-color: #ffd700;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: start;
    border-radius: 0 10px 10px 0;
`;

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const HomeTextButton = styled.span`
    color: black;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
`;

const ChatArea = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`;

const InputArea = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MessageInput = styled.textarea`
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    resize: none;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
    margin-right: 10px;

    &:focus {
        border-color: #ffd700;
    }
`;

const SendButton = styled.button`
    padding: 10px 20px;
    background-color: #ffd700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;

    &:hover {
        background-color: #ffcc00;
    }
`;
