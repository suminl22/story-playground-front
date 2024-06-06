import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../shared/components/ChatBubble';
import { Link } from 'react-router-dom';
import { client } from '../shared/remotes/axios';
import SystemPrompting1 from '../feature/chat/components/systemPrompting1';
import SystemPrompting2 from '../feature/chat/components/systemPrompting2';
import styled from '@emotion/styled';

interface Message {
  role: string;
  content: string;
}

const ChatPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef<boolean>(true);

  useEffect(() => {
    const fetchFirstSentence = async () => {
      try {
        const firstSentence = await getFirstSentence();
        if (firstSentence) {
          const systemMessage = { role: 'assistant', content: firstSentence };
          setMessages((prevMessages) => [...prevMessages, systemMessage]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching first sentence:', error);
      }
    };

    fetchFirstSentence();
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesRef.current && isAtBottomRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (messagesRef.current) {
          messagesRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);
  const handleScroll = () => {
    if (messagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
      isAtBottomRef.current = scrollTop + clientHeight >= scrollHeight;
    }
  };


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
      const userMessage = { content: messageText, role: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const allMessages = [...messages, userMessage].map((message) => ({
        content: message.content,
        role: message.role,
      }));

      fetchGptAPITokenAndCommunicate(messageText, allMessages);

      input.value = '';
    }
  };

  const getFirstSentence = async (): Promise<string | null> => {
    try {
      const tokenResponse = await client.get('/chat-gpt/token');
      const gptAPIToken = tokenResponse.data;

      const requestData = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: SystemPrompting1,
          },
        ],
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

      const response = await client.post('https://api.openai.com/v1/chat/completions', requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${gptAPIToken}`,
        },
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching GPT API token or communicating with GPT API:', error);
      return null;
    }
  };

  const fetchGptAPITokenAndCommunicate = async (inputText: string, allMessages: Message[]) => {
    try {
      setIsLoading(true);

      allMessages.unshift({
        role: 'system',
        content: SystemPrompting2,
      });

      const tokenResponse = await client.get('/chat-gpt/token', { params: { inputText } });
      const gptAPIToken = tokenResponse.data;

      const requestData = {
        model: 'gpt-3.5-turbo',
        messages: allMessages,
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

      const response = await client.post('https://api.openai.com/v1/chat/completions', requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${gptAPIToken}`,
        },
      });

      const completedMessage = response.data.choices[0].message.content;
      const computerMessage = { content: completedMessage, role: 'assistant' };
      setMessages((prevMessages) => [...prevMessages, computerMessage]);
    } catch (error) {
      console.error('Error fetching GPT API token or communicating with GPT API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Sidebar>
        <StyledLink to="/home">돌아가기</StyledLink>
      </Sidebar>
      <MainContent>
        <ChatArea ref={messagesRef}>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message.content} isUser={message.role === 'user'} />
          ))}
          {isLoading && <ChatBubble key="loading" message="문장을 만들고 있어용..." isUser={false} />}
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 16px;
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
