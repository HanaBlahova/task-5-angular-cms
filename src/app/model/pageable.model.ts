import { User } from './user.model';

export interface Pageable {
    page: number;
    limit: number;
    count: number;
    total: number;
    hasPrev: boolean;
    hasNext: boolean
}

export interface UsersPageable {
    pagination: Pageable;
    items: User[]
}