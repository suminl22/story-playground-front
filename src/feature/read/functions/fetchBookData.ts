import { client } from '../../../shared/remotes/axios';
import { BookDetail, GetBookData } from '../../../shared/types/book';
import { formatDate } from '../../../shared/functions/formatDate';



export const fetchBookData = async (storyId : number) => {
  try{
    const response = await client.get<GetBookData>(`/make/info/${storyId}`);
    const data = response.data;

    const formattedData: BookDetail = {
      id: data.storyId,
      title: data.title,
      author: data.username,
      category: data.topic,
      visibility: data.visibility,
      likeNum: data.likeNum,
      dislikeNum: data.dislikeNum,
      isMine: data.isMine,
      isEvaluated: data.isEvaluated,
      modifiedDate: formatDate(data.modifiedDate),
    };

    return formattedData;
  } catch (error){
    console.log('visibility and like num 패칭 오류', error);
    return null;
  }
}