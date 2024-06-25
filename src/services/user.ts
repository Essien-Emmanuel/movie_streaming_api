import { DeepPartial } from "typeorm";
import { HandlerData } from '../core/types'
import { User } from "../database/entities/user.entity";
import { UserRepo } from "../database/repositories/user.repo";

export class UserService {
    static async createUser(data: DeepPartial<User>): Promise<HandlerData>  {
        const newUser =  await UserRepo.create(data);
        console.log('new user ', newUser);

        return {
            statusCode: 201,
            message: 'Created a user successfully.',
            data: { newUser }
        }
    }

    static async getAllUsers(): Promise<HandlerData> {
        const users = await UserRepo.getAll();
        
        return {
            message: 'Fetched all users',
            data: { users }
        }
    }
}