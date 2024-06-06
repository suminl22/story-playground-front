import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchFirstSentence } from '../feature/chat/functions/fetchFirstSentence';
import { fetchNextSentence } from '../feature/chat/functions/fetchNextSentence';
import { useRecoilState } from 'recoil';
import { chatState } from '../recoil/chat/chat';
import ChatBubble from '../shared/components/ChatBubble';
import { message } from '../shared/types/message';

const ChatPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [messages, setMessages] = useRecoilState<message[]>(chatState);
  const messagesRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef<boolean>(true);
  const navigate = useNavigate();
  const [storyId, setStoryId] = useState<number>(0);
  const [triggerFetchNext, setTriggerFetchNext] = useState<boolean>(false);
  const [isFirstSentenceFetched, setIsFirstSentenceFetched] = useState<boolean>(false);
  const [isFetchingNext, setIsFetchingNext] = useState<boolean>(false);

  // Fetch the first sentence when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFirstSentence();
      if (data !== null) {
        const systemMessage: message = { role: 'assistant', content: data.content };
        setMessages((prevMessages) => [...prevMessages, systemMessage]);
        setIsLoading(false);
        setStoryId(data.storyId);
        setIsFirstSentenceFetched(true);
      }
    };

    fetchData();

    return () => {
      setMessages([]); // Clear messages on unmount
    };
  }, []); // Removed setMessages from dependency array to ensure it runs only once

  // Fetch the next sentence after the user sends a message
  useEffect(() => {
    const fetchNext = async () => {
      if (triggerFetchNext && !isComposing && isFirstSentenceFetched) {
        setTriggerFetchNext(false); // Ensure it only runs once
        setIsFetchingNext(true); // Start loading
        const nextSentence = await fetchNextSentence(storyId, messages[messages.length - 1].content);
        if (nextSentence !== null) {
          const systemMessage: message = { role: 'assistant', content: nextSentence };
          setMessages((prevMessages) => [...prevMessages, systemMessage]);
          setIsLoading(false);
          setIsFetchingNext(false); // Stop loading
        }
      }
    };

    fetchNext();
  }, [triggerFetchNext, isComposing, storyId, messages, isFirstSentenceFetched]);

  // Scroll to the bottom of the chat area whenever messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesRef.current && isAtBottomRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  // Handle scrolling in the chat area
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

  // Handle composition start for IME
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // Handle composition end for IME
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // Handle key press in the input area
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isComposing) {
      event.preventDefault();
      sendMessage();
    }
  };

  // Send message and trigger fetch for the next sentence
  const sendMessage = () => {
    const input = document.getElementById('message-input') as HTMLTextAreaElement;
    const messageText = input.value.trim();
    if (messageText !== '') {
      const userMessage: message = { role: 'user', content: messageText };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      input.value = '';
      setTriggerFetchNext(true);
    }
  };

  // Navigate back to home
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
          {isFetchingNext && <ChatBubble key="fetching" message="문장을 만들고 있어용..." role="assistant" />}
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

export default ChatPage;

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
    display: flex;
    flex-direction: column;
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
