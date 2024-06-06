import { client } from '../../../shared/remotes/axios';

export const fetchFirstSentence = async () => {
  try {
    const response = await client.post('/make/');
    const data = {
      "content": response.data["content"],
      "storyId": response.data["storyId"],
    };

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching First Sentence!!!' , error);
    return null;
  }
}