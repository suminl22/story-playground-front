import { client } from '../../../shared/remotes/axios';


export const fetchNextSentence = async (storyId: number, userSentence: string) => {
  try {
    const requestData = {
      newStory: userSentence,
    };
    const response = await client.post(`/make/${storyId}/append`, requestData);
    return response.data;
  } catch (error) {
    console.error('다음 문장 가져오는 거 에러!!!', error);
    return null;
  }
};
