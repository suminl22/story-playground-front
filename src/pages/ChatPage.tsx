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

  const handleScroll = () => {
    if (messagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
      isAtBottomRef.current = scrollTop + clientHeight >= scrollHeight;
    }
  };

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

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        if (!isComposing) {
          event.preventDefault();
          insertAtCaret('\n');
        }
      } else {
        if (!isComposing) {
          event.preventDefault();
          sendMessage();
        }
      }
    }
  };

  const insertAtCaret = (text: string) => {
    const txtarea = document.getElementById('message-input') as HTMLTextAreaElement;
    const scrollPos = txtarea.scrollTop;
    let caretPos = txtarea.selectionStart;

    const front = txtarea.value.substring(0, caretPos);
    const back = txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
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

      const completedMessage = response.data.choices[0].message.content;
      return completedMessage;
    } catch (error) {
      console.error('Error fetching GPT API token or communicating with GPT API:', error);
      return null;
    }
  };

  const fetchGptAPITokenAndCommunicate = (inputText: string, allMessages: Message[]) => {
    setIsLoading(true);

    allMessages.unshift({
      role: 'system',
      content: SystemPrompting2,
    });

    const messages = allMessages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    messages.push({
      role: 'user',
      content: inputText,
    });

    client
      .get('/chat-gpt/token', { params: { inputText } })
      .then((response) => {
        const gptAPIToken = response.data;

        const requestData = {
          model: 'gpt-3.5-turbo',
          messages: messages,
          temperature: 1,
          max_tokens: 4096,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        };

        return client.post('https://api.openai.com/v1/chat/completions', requestData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${gptAPIToken}`,
          },
        });
      })
      .then((response) => {
        const completedMessage = response.data.choices[0].message.content;
        const computerMessage = { content: completedMessage, role: 'assistant' };
        setMessages((prevMessages) => [...prevMessages, computerMessage]);
      })
      .catch((error) => {
        console.error('Error fetching GPT API token or communicating with GPT API:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Sidebar>
        <StyledLink to="/home">돌아가기</StyledLink>
      </Sidebar>
      <ChatArea ref={messagesRef}>
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            message={message.content}
            isUser={message.role === 'user'}/>
        ))}
        {isLoading && <ChatBubble key="loading" message="문장을 만들고 있어용..." isUser={false} />}
      </ChatArea>
      <InputArea>
        <Spacer />
        <MessageInput
          id="message-input"
          placeholder="다음 이야기를 입력해줘"
          onKeyDown={handleKeyPress}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <Spacer />
        <SendButton onClick={sendMessage}>입력</SendButton>
      </InputArea>
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
    background-color: #eff3f7;
    display: flex;
    border-radius: 5px;
`;

const Sidebar = styled.div`
    height: calc(100vh - 100px);
    width: 15%;
    background-color: #ffd700;
    padding: 20px;
    display: flex;
    justify-content: center;
    margin-right: 10px;
    border-radius: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 16px;
`;

const ChatArea = styled.div`
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    flex-grow: 1;
`;

const InputArea = styled.div`
    display: flex;
    width: 90%;
    height: 50px;
    position: fixed;
    bottom: 20px;
`;

const Spacer = styled.div`
    width: 20%;
    height: 80%;
`;

const MessageInput = styled.textarea`
    width: calc(100% - 120px);
    height: 100%;
    margin-bottom: 20px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-right: 10px;
`;

const SendButton = styled.button`
    width: 100px;
    height: 100%;
    margin-left: 10px;
    background-color: #ffd700;
    color: black;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
`;
