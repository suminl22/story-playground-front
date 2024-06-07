import { client } from '../../../shared/remotes/axios';
import { CompletedBook, IncompletedBook } from '../../../shared/types/book';
import { formatDate } from '../../../shared/functions/formatDate';

interface BookData {
  storyId: number;
  title: string;
  modifiedDate: string;
  topic: string;
  likeNum: number;
  dislikeNum: number;
}


export const fetchIncompletedBooks = async (): Promise<IncompletedBook[]>=>{
  try {
    const response = await client.get<BookData[]>(`/main/list/incomplete`);
    const data= response.data;

    const formattedData: IncompletedBook[] = data.map((story, index) => ({
      ...story,
      id: story.storyId,
      title: '미완성',
      category: story.topic,
      modifiedDate: formatDate(story.modifiedDate),
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }

}