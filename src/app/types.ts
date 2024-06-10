export type typePost = {
  id: string;
  title: string;
  content: string;
  slug: string;
  likes: number;
  dislikes: number;
  published: boolean;
  updatedAt?: string;
  date: string;
};

export type newPostData = {
  title: string;
  content: string;
};
