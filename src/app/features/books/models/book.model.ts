export interface Book {
  id?: string;
  title: string;
  author: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
}
