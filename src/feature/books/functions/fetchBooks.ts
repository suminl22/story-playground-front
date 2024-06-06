import { client } from '../../../shared/remotes/axios';
import { PublicBook } from '../../../shared/types/book';

interface BookData {
  storyId: number;
  title: string;
  modifiedDate: string;
  likeNum: number;
  dislikeNum: number;
  topic: string;
  username: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

export const fetchBooks = async (category: string, filter: string): Promise<PublicBook[]> => {
  try {
    const response = await client.get(`/community/stories/${category}/${filter}`);
    const datas: { data: BookData[] } = response.data;

    const books: PublicBook[] = datas.data.map((book: BookData) => ({
      id: book.storyId,
      title: book.title,
      author: book.username,
      createdAt: formatDate(book.modifiedDate),
      likeNum: book.likeNum,
      dislikeNum: book.dislikeNum,
      category: book.topic,
    }));

    return books;
  } catch (error) {
    console.log('전체&좋아요 받아오기 실패!!', error);
    return [];
  }
};