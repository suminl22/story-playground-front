import { client } from '../../../shared/remotes/axios';

export const fetchFirstSentence = async (): Promise<string|null> => {
  try {
    const response = await client.post('/make/');
    console.log(response.data);
    return response.data["content"];
  } catch (error) {
    console.error('Error fetching First Sentence!!!' , error);
    return null;
  }
}