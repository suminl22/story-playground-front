import { client } from '../../../shared/remotes/axios';

export const fetchNextSentence = async (storyId: number, userSentence: string): Promise<string | null> => {
  try {
    const requestData = {
      newStory: userSentence,
    };
    const response = await client.post(`/make/${storyId}/append`, requestData);
    console.log(response.data);
    return response.data.content;  // Assuming 'content' is the field you want to display
  } catch (error) {
    console.error('다음 문장 가져오는 거 에러!!!', error);
    return null;
  }
};
