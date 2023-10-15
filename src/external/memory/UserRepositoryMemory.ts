import User from "../../core/user/model/User";
import UserRepository from "../../core/user/service/UserRepository";

export default class UserRepositoryMemory implements UserRepository {
    private readonly users: User[] = [];

    async get(): Promise<User[]> {
        return this.users;
    }

    async getOne(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) ?? null
    }

    async post(user: User): Promise<User> {
        const newUser = { ...user, id: Math.random() }
        this.users.push(user);
        return newUser;
    }

    async put(email: string, data: User): Promise<User | string> {
        let user = this.users.find(item => item.email == email);

        if(!user) return 'not found';

        user.name = data.name;
        user.email = data.email;
        user.password = data.password;

        return user;
    }

    async delete(email: string): Promise<User | string>{
        const user = this.users.find(item => item.email === email);

        if(!user) return 'not found';
        
        this.users.splice(this.users.indexOf(user), 1);

        return user;
    }
}