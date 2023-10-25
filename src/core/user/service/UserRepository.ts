import User from "../model/User";

export default interface UserRepository {
    get(): Promise<User[]>
    getOne(email: string): Promise<User | null>
    post(user: User): Promise<User>
    put(email: string, user:User): Promise<User>
    delete(email: string): Promise<User>
}