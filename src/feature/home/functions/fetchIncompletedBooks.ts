import { client } from '../../../shared/remotes/axios';
import { IncompletedBook } from '../../../shared/types/book';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

export const fetchIncompletedBooks = async ()=>{
  try {
    const response = await client.get<IncompletedBook[]>(`/main/list/incomplete`);
    let data = response.data;
    console.log(data);

    data = data.map((story, index) => ({
      ...story,
      id: story.id,
      title: '미완성',
      modifiedDate: formatDate(story.modifiedDate),
    }));

    return data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return '';
  }

}