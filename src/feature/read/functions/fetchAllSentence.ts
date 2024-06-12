import { client } from '../../../shared/remotes/axios';

export const fetchAllSentence = async (storyId: number) => {
  try {
    const response = await client.get(`/make/${storyId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('이전 대화 불러오기 실패~~~~~~~~~' , error);
    return null;
  }
}