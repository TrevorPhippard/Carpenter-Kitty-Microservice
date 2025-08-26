export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type User = Entity<{
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
  bio: string;
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
};

export type Post = {
  id: string;
  author: string;
  content: string;
  comments: Comment[];
};

export type AddPostInput = {
  author: string;
  content: string;
  // comments?: { author: string; content: string }[];
};
