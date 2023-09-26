export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    role: string;
    token?: string;
}