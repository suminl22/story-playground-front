import { client } from '../../../shared/remotes/axios';

export const getJoayo = async (storyId: number, likeStatus: string) => {
  try{
    let unlike0like1;

    if(likeStatus === 'like'){
      unlike0like1 = 1;
    } else {
      unlike0like1 = 0;
    }
    await client.get(`/community/evaluation/${storyId}/${unlike0like1}`);

  } catch(error) {
    console.log('getJoayo 함수 실패!');
  }
}