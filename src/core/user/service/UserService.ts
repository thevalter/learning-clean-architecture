import UseCase from "../../shared/UseCase";
import User from "../model/User";
import UserRepository from "./UserRepository";

type Input = {
    name: string
    email: string
    password: string
}

export default class UserService implements UseCase<User | string, User[] | User | string>{
    constructor(readonly repository: UserRepository) { }

    async get(): Promise<User[]> {
        const response = await this.repository.get();
        return response;
    }

    async post(data: Input): Promise<User | string> {
        const { name, email, password } = data;

        const userExists = await this.repository.getOne(email)

        if (userExists) {
            return "User already exists";
        }

        const user = await this.repository.post({ name, email, password });

        return user;
    }

    async put(email: string, data: Input): Promise<User | string> {

        if (!this.repository.getOne(email)) return "User does not exists";

        const user = await this.repository.put(email, data)

        return user;
    }

    async getOne(email: string): Promise<User | string> {
        const response = await this.repository.getOne(email);

        if (!response) return "User does not exists";

        return response;
    }

    async delete(email:string): Promise<User | string>{
        const user = await this.repository.getOne(email);

        if (!user) return "not found";

        const response = await this.repository.delete(email);
        return response
    }
}