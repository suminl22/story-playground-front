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