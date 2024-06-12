import { client } from '../../../shared/remotes/axios';

export const fetchCategory = async ()=>{
  try{
    const response = await client.get<string[]>('/community/topics');
    const data = response.data;
    return data;
  } catch(error){
    console.log('카테고리 받아오는거 실패!!', error);
    return [];
  }
}