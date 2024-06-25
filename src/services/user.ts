import { DeepPartial } from "typeorm";
import { HandlerData } from '../core/types'
import { User } from "../database/entities/user.entity";
import { UserRepo } from "../database/repositories/user.repo";

export class UserService {
    static async createUser(data: DeepPartial<User>): Promise<HandlerData>  {
        const newUser =  await UserRepo.create(data);
        console.log('new user ', newUser);

        return {
            message: '',
            data: { newUser }
        }
    }

    static async getAllUsers(): Promise<HandlerData> {
        const users = [
            {
                id: 1,
                email: 'user1@gmail.com',
            },
            {
                id: 2,
                email: 'user2@gmail.com'
            }
        ];
        return {
            message: 'Fetched all users',
            data: { users }
        }
    }
}