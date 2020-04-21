import { User } from './user.model';
import { Category } from './category.model';

export interface PostForm {
    title: string;
    perex: string;
    content: string;
    categories?: string[];
    img: string;
}

export interface Post {
    _id: string;
    title: string;
    perex: string;
    content: string;
    img: string;
    slug: string;
    author?: User;
    categories?: Category[];
}


