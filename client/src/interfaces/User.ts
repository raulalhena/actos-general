export interface User {
    id: string | null;
    name: string | null;
    email: string | null;
    surname: string | null;
    role: string | null;
    token?: string | null;
}