import { defineController } from "../core/defineController";
import { ControllerRequest } from '../core/types';
import {Controller, Post, Get } from '../core/decorators/index';
import { UserService } from '../services/user';
import { AuthMiddleware } from "../middlewares/auth";
import { TokenFlag } from '../types';

const { createUser, getAllUsers } = UserService;

@Controller({
    basePath: '/users',
    use: [ AuthMiddleware.authentication(TokenFlag.AUTH)]
})
export class UserController {
    @Get()
    static getAllUsers() {
        return defineController({
            async controller(req: ControllerRequest) {
                const response = await getAllUsers();
                req.return?.(response);
            }
        })
    }

    @Post()
    static createUser() {
        return defineController({
            async controller(req: ControllerRequest){
                const response = await createUser(req.body);
                req.return?.(response);
            }
        });
    }
}