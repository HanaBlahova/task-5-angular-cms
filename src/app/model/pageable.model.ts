import { User } from './user.model';
import { Post } from './post.model';

export interface Pageable {
    page: number;
    limit: number;
    count: number;
    total: number;
    hasPrev: boolean;
    hasNext: boolean;
}

export interface UsersPageable {
    pagination: Pageable;
    items: User[];
}

export interface PostsPageable {
    pagination: Pageable;
    items: Post[];
}
