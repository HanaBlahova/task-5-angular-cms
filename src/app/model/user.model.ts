export interface UserForm {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    email: string;
    roles?: string[];
}
