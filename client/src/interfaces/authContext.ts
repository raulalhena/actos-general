export interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
}