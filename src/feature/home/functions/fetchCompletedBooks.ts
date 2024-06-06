import { client } from '../../../shared/remotes/axios';
import { CompletedBook } from '../../../shared/types/book';

interface BookData {
  storyId: number;
  title: string;
  modifiedDate: string;
  topic: string;
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

export const fetchCompletedBooks = async (): Promise<CompletedBook[]> => {
  try {
    const response = await client.get<BookData[]>(`/main/list/complete`);
    const data = response.data;
    console.log(data);

    const formattedData: CompletedBook[] = data.map((story) => ({
      id: story.storyId,
      title: story.title,
      createdAt: formatDate(story.modifiedDate),
      category: story.topic,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}
