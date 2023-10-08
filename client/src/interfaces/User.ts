export interface User {
    _id: string | undefined;
    id: string | null;
    name: string | null;
    email: string | null;
    surname: string | null;
    role: string;
    token: string | null;
}