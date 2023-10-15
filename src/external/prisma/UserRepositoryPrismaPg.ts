import { PrismaClient } from "@prisma/client";
import User from "../../core/user/model/User";
import UserRepository from "../../core/user/service/UserRepository";

export default class UserRepositoryPrismaPg implements UserRepository{
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    async get(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async post(user: User): Promise<User> {
        return this.prisma.user.create({data: user});
    }

    async put(email:string, data: User): Promise<User> {

        return this.prisma.user.update({
            where: {
              email
            },
            data
          })
    }

    async delete(email: string): Promise<User>{

        return this.prisma.user.delete({
            where: {
                email
            }
        })
    }
} 