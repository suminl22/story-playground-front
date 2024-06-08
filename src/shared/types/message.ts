export interface message {
  role: 'user' | 'assistant';
  content: string;
}

export interface NextSentence {
  content: string;
  isCompleted: boolean;
}