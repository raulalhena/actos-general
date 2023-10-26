export interface User {
    _id: string | undefined;
    name: string | null;
    email: string | null;
    surname: string | null;
    role: string;
    token: string | null;
}