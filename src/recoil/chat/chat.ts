import { atom } from 'recoil';
import { message } from '../../shared/types/message';

export const chatState = atom<message[]>({
  key: 'chatState',
  default: [],
})