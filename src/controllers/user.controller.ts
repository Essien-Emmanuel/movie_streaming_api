import { ControllerRequest } from '../core/types';
import { Controller, Middleware, Validate, Post, Get } from '../core/decorators/index';
import { UserService } from '../services/user';
import { AuthMiddleware } from "../middlewares/auth";
import {  Role, TokenFlag, } from '../types';
import { NextFunction, Response, } from "express";
import { defineHandler } from "../core/defineHandler";
import { UserSignupSchema } from '../validators/schemas/user.schema';

console.log('log:: ', Middleware([AuthMiddleware.Authorize([ Role.USER ])]), TokenFlag.AUTH);

@Controller({
    basePath: '/users',
    // use: [ AuthMiddleware.authenticate(TokenFlag.AUTH) ]
})
export class UserController {
    private userService = UserService;

    @Middleware([AuthMiddleware.Authorize([ Role.USER ])])
    @Get()
    getAllUsers(req: ControllerRequest, res: Response, next: NextFunction) {
        return defineHandler(() => {
            return this.userService.getAllUsers();
		})(req, res, next);
	}
    
    @Validate(UserSignupSchema)
    @Post()
    createUser(req: ControllerRequest, res: Response, next: NextFunction) {
        return defineHandler((req: ControllerRequest) => {
			return this.userService.createUser(req.body);
		})(req, res, next);
    }
}