import { client } from '../../../shared/remotes/axios';

export const fetchPreviousSentences = async ():Promise<string[]|null> => {
  try {
    const response = await client.get('/make');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching First Sentence!!!' , error);
    return null;
  }
}