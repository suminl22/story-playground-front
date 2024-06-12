import React from 'react';
import { client } from '../../../shared/remotes/axios';

type SignUpResult = Promise<boolean | unknown>;

export const postSignUp = async(username: string, password: string): SignUpResult=> {

  try {
    const response = await client.post('/register/user', {
      username: username,
      password: password
    });

    if (response.data === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    return error;
  }
}