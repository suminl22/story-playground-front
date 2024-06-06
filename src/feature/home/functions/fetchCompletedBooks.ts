import { client } from '../../../shared/remotes/axios';
import { CompletedBook } from '../../../shared/types/book';

export const fetchCompletedBooks = async ()=>{
  try {
    const response = await client.get<CompletedBook[]>(`/story/user/incomplete`);
    let data = response.data;
    console.log(data);

    data = data.map((story, index) => ({
      ...story,
      id: story.id,
      title: story.title,
      createdAt: story.createdAt,
    }));

    return data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return '';
  }

}