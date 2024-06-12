import { client } from '../../../shared/remotes/axios';
import { saveTokenToLocalStorage } from './saveTokenToLocalStorage';

type LoginResult = Promise<boolean | unknown>;

export const postLogin= async (username: string, password: string): LoginResult => {

  try {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const response = await client.post('/login', formData);

    if (response.status === 200) {
      alert("환영합니다!");
      saveTokenToLocalStorage(response.headers['authorization']);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('로그인 요청 실패:', error);
    return error;
  }
};