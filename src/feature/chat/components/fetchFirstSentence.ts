import { client } from '../../../shared/remotes/axios';

export const fetchFirstSentence = async (): Promise<string|null> => {
  try {
    const response = await client.get('https://api.openai.com/v1/chat/completions');
    return response.data;
  } catch (error) {
    console.error('Error fetching First Sentence!!!' , error);
    return null;
  }
}