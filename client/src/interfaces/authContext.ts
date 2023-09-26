export interface AuthContextInterface {
    user: User | null;
    setUser: (user: User | null) => void;
}