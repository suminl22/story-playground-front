export interface IncompletedBook {
  id: number;
  title: string;
  modifiedDate: string;
}

export interface CompletedBook {
  id: number;
  title: string;
  createdAt: string;
  category: string;
  // openness: 'public' | 'private';
}

export interface PublicBook {
  id: number;
  title: string;
  createdAt: string;
  author: string;
  likeNum: number;
  dislikeNum: number;
  category: string;
}

export interface BookDetail {
  id: number;
  title: string;
  author: string;
  category: string;
  visibility: string;
  likeNum: number;
  dislikeNum: number;
  isMine: boolean;
  isEvaluated: boolean;
  modifiedDate: string;
}

export interface GetBookData {
  storyId: number;
  title: string;
  username: string;
  topic: string;
  isCompleted: boolean;
  modifiedDate: string;
  visibility: "PUBLIC" | "PRIVATE";
  likeNum: number;
  dislikeNum: number;
  isMine: boolean;
  isEvaluated: boolean;
}