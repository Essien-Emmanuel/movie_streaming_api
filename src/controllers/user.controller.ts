import { defineController } from "../core/defineController";
import { ControllerRequest } from '../core/types';
import { Controller, Middleware, Post, Get } from '../core/decorators/index';
import { UserService } from '../services/user';
import { AuthMiddleware } from "../middlewares/auth";
import {  Role, TokenFlag, } from '../types';
import { NextFunction, Response, } from "express";
import { defineHandler } from "../core/defineHandler";

const { createUser } = UserService;
console.log('log:: ', Middleware([AuthMiddleware.Authorize([ Role.USER ])]), TokenFlag.AUTH)

@Controller({
    basePath: '/users',
    // use: [ AuthMiddleware.authenticate(TokenFlag.AUTH) ]
})
export class UserController {
    private userService = UserService;

    // @Middleware([AuthMiddleware.Authorize([ Role.USER ])])
    @Get()
    getAllUsers(req: ControllerRequest, res: Response, next: NextFunction) {
		return defineHandler((req: ControllerRequest) => {
			return this.userService.getAllUsers();
		})(req, res, next);
	}

    @Post()
    createUser() {
        return defineController({
            async controller(req: ControllerRequest){
                const response = await createUser(req.body);
                req.return?.(response);
            }
        });
    }
}