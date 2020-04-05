import { User } from './user.model';
import { Category } from './category.model';

export interface PostForm {
    title: string;
    content: string;
    categories: string[]
}

export interface Post {
    _id: string;
    title: string;
    perex: string;
    content: string;
    image: string;
    slug: string;
    author: User;
    categories: Category[]
}