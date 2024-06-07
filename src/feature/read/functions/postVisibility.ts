import { client } from '../../../shared/remotes/axios';

export const postVisibility = async (storyId: number, visibility: string) => {
  try{
    await client.post(`/make/${storyId}/visible/${visibility}`);
  } catch(error){
    console.log('postVisibility 에러', error);
  }
}