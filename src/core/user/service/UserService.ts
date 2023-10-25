import { json } from "express";
import UseCase from "../../shared/UseCase";
import User from "../model/User";
import UserRepository from "./UserRepository";
import * as yup from 'yup';

type Input = {
    name: string
    email: string
    password: string
}

export type Response = {
    message?: string | yup.ValidationError,
    data?: User | User[],
    code: number
}

export const postValidation = yup.object({
    body: yup.object({
        name: yup.string().required().min(3),
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
      }),
})

export const putValidation = yup.object({
    body: yup.object({
        name: yup.string().min(3),
        email: yup.string().email(),
        password: yup.string().min(8)
      }),
})

export default class UserService implements UseCase<User | string, Response>{
    constructor(readonly repository: UserRepository) { }

    async get() {
        const response = await this.repository.get();
        return {
            data: response,
            code: 200 
        };
    }

    async post(data: Input): Promise<Response> {

        const userExists = await this.repository.getOne(data.email);

        if (userExists) {
            return {
                message: "User already exists",
                code: 422
            };
        }

        try {
            const user = await this.repository.post(data);

            return {
                data: user,
                code: 201
            };
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return {
                message: yupError,
                code: 500
            };
        }

    }

    async put(email: string, data: Input): Promise<Response> {

        const {name, password} = data;

        if (!this.repository.getOne(email)) {
            return {
                message: "User does not exists",
                code: 404
            };
        } 
    
        const user = await this.repository.put(email, {name, password, email})

        return {
            data: user,
            code: 200
        };
    }

    async getOne(email: string): Promise<Response> {
        const response = await this.repository.getOne(email);

        if (!response) {
            return {
                message: "User does not exists",
                code: 404
            } 
        }

        return {
            data: response,
            code: 200
        }
    }

    async delete(email: string): Promise<Response> {
        const user = await this.repository.getOne(email);

        if (!user){
            return {
                message: "not found",
                code: 404
            }
        }

        await this.repository.delete(email);

        return {
            message: "User deleted successfully",
            code: 200
        }
    }
}