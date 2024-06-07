import { client } from '../../../shared/remotes/axios';
import { CompletedBook } from '../../../shared/types/book';
import { formatDate } from '../../../shared/functions/formatDate';

interface BookData {
  storyId: number;
  title: string;
  modifiedDate: string;
  topic: string;
}

export const fetchCompletedBooks = async (): Promise<CompletedBook[]> => {
  try {
    const response = await client.get<BookData[]>(`/main/list/complete`);
    const data = response.data;

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
