import { client } from '../../../shared/remotes/axios';
import { IncompletedBook } from '../../../shared/types/book';

export const fetchIncompletedBooks = async ()=>{
  try {
    const response = await client.get<IncompletedBook[]>(`/story/user/incomplete`);
    let data = response.data;
    console.log(data);

    data = data.map((story, index) => ({
      ...story,
      id: story.id,
      title: story.title,
      modifiedAt: story.modifiedAt,
    }));

    return data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return '';
  }

}