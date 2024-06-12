import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchNextSentence } from '../feature/chat/functions/fetchNextSentence';
import { useRecoilState } from 'recoil';
import { chatState } from '../recoil/chat/chat';
import ChatBubble from '../shared/components/ChatBubble';
import { message } from '../shared/types/message';
import { fetchAllSentence } from '../feature/read/functions/fetchAllSentence';
import { fetchBookData } from '../feature/read/functions/fetchBookData';
import { BookDetail } from '../shared/types/book';
import { getJoayo } from '../feature/read/functions/getJoayo';
import { postVisibility } from '../feature/read/functions/postVisibility';

const ReadPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [messages, setMessages] = useRecoilState<message[]>(chatState);
  const messagesRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef<boolean>(true);
  const navigate = useNavigate();
  const [triggerFetchNext, setTriggerFetchNext] = useState<boolean>(false);
  const [isSentenceFetched, setIsSentenceFetched] = useState<boolean>(false);
  const [isFetchingNext, setIsFetchingNext] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<string>('PRIVATE');
  const [bookData, setBookData] = useState<BookDetail>();
  const [likeStatus, setLikeStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBookData(Number(storyId));
      if (data != null) {
        setBookData(data);
        setVisibility(data.visibility); // Set the visibility based on fetched data
      }
    };

    const fetchSentences = async () => {
      const data = await fetchAllSentence(Number(storyId));
      if (data !== null) {
        const formattedMessages: message[] = data.map((content: string, index: number) => ({
          role: index % 2 === 0 ? 'assistant' : 'user',
          content,
        }));
        setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
        setIsLoading(false);
        setIsSentenceFetched(true);
      }
    };

    fetchSentences();
    fetchData();

    return () => {
      setMessages([]);
    };
  }, [storyId, setMessages]);

  useEffect(() => {
    const fetchNext = async () => {
      if (triggerFetchNext && !isComposing && isSentenceFetched) {
        setTriggerFetchNext(false);
        setIsFetchingNext(true);
        const nextSentence = await fetchNextSentence(Number(storyId), messages[messages.length - 1].content);
        if (nextSentence !== null) {
          const systemMessage: message = { role: 'assistant', content: nextSentence };
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, systemMessage];
            scrollToBottom(); // Scroll to bottom when messages update
            return updatedMessages;
          });
          setIsLoading(false);
          setIsFetchingNext(false); // Stop loading
        }
      }
    };

    fetchNext();
  }, [triggerFetchNext, isComposing, storyId, messages, isSentenceFetched, setMessages]);

  // Scroll to the bottom of the chat area whenever messages change
  useEffect(() => {
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

  const scrollToBottom = () => {
    if (messagesRef.current && isAtBottomRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  // Navigate back to home
  const handleClick = () => {
    navigate('/home');
  };

  // Handle like and dislike buttons
  const handleLikeClick = () => {
    if (likeStatus !== 'like') {
      setLikeStatus('like');
    } else {
      setLikeStatus('');
    }
  };

  const handleDislikeClick = () => {
    if (likeStatus !== 'dislike') {
      setLikeStatus('dislike');
    } else {
      setLikeStatus('');
    }
  };

  useEffect(() => {
    if (likeStatus && bookData && !bookData.isEvaluated) {
      getJoayo(Number(storyId), likeStatus);
      setBookData((prevData) => (prevData ? { ...prevData, isEvaluated: true } : undefined));
      setLikeStatus('');
    }
  }, [likeStatus, bookData, storyId]);

  // Handle visibility toggle buttons
  const handleVisibilityChange = (newVisibility: string) => {
    if (newVisibility !== visibility) {
      setVisibility(newVisibility);
      if (bookData) {
        postVisibility(Number(storyId), newVisibility);
      }
    }
  };

  return (
    <Container>
      <Sidebar>
        <HomeTextButton onClick={handleClick}>돌아가기</HomeTextButton>
        {bookData?.isMine && (
          <>
            <ToggleButton
              onClick={() => handleVisibilityChange('PUBLIC')}
              active={visibility === 'PUBLIC'}
            >
              PUBLIC
            </ToggleButton>
            <ToggleButton
              onClick={() => handleVisibilityChange('PRIVATE')}
              active={visibility === 'PRIVATE'}
            >
              PRIVATE
            </ToggleButton>
          </>
        )}
      </Sidebar>
      <MainContent>
        <HeaderContainer>
          <Title>{bookData?.title}</Title>
          <>
            <SubText>작가 : {bookData?.author}</SubText>
            <SubText>작성날짜 : {bookData?.modifiedDate}</SubText>
            <SubText>교훈 : {bookData?.category}</SubText>
          </>
        </HeaderContainer>
        <ChatArea ref={messagesRef}>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message.content} role={message.role} />
          ))}
          {isLoading && <ChatBubble key="loading" message="문장을 만들고 있어용..." role="assistant" />}
          {isFetchingNext && <ChatBubble key="fetching" message="문장을 만들고 있어용..." role="assistant" />}
        </ChatArea>
        <ButtonArea>
          {bookData?.isEvaluated ? (
            <EvaluatedText>이미 평가되었습니다!</EvaluatedText>
          ) : (
            <>
              <ActionButton onClick={handleLikeClick} active={likeStatus === 'like'}>좋아요</ActionButton>
              <ActionButton onClick={handleDislikeClick} active={likeStatus === 'dislike'}>싫어요</ActionButton>
            </>
          )}
        </ButtonArea>
      </MainContent>
    </Container>
  );
};

export default ReadPage;

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
    flex-direction: column;
    justify-content: start;
    align-items: center;
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
    margin: 40px 0 40px 0;

`;

const HeaderContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    flex-direction: row;
    display: flex;
    height: 50px;
    margin-bottom: 30px;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
`

const Title = styled.span`
    font-size: 24px;
    font-weight: bold;
`

const SubText = styled.span`
    font-size: 16px;
    margin-left: 16px;
`

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

const ButtonArea = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const ActionButton = styled.button<{ active: boolean }>`
    padding: 10px 20px;
    background-color: ${({ active }) => (active ? '#ffcc00' : '#ffd700')};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    margin: 0 5px;
    width: 50%;
    height: 40px;

    &:hover {
        background-color: #ffcc00;
    }
`;

const ToggleButton = styled.button<{ active: boolean }>`
    padding: 10px 20px;
    background-color: ${({ active }) => (active ? '#ffcc00' : '#ffd700')};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;

    &:hover {
        background-color: #ffcc00;
    }
`;

const EvaluatedText = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #ff0000;
`;
