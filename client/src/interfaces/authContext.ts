export interface AuthContextInterface {
    user: User | null;
    setUser: Dispatch<SetStateAction<User>>
}