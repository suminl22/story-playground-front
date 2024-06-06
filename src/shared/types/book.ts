export interface IncompletedBook {
  id: number;
  title: string;
  modifiedAt: string;
}

export interface CompletedBook {
  id: number;
  title: string;
  createdAt: string;
  author: string;
}