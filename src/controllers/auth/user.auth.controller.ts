import { Controller, Post, Validate } from "@/src/core/decorators";
import { ControllerRequest } from "@/src/core/types";
import { wrapHandler } from "@/src/core/wrapHandler";
import initiateSignup from "@/src/services/auth/initiateSignup";
import { UserSignupSchema } from "@/src/validators/schemas/user.schema";
import { NextFunction, Response } from "express";

@Controller({
    basePath: '/users/auth'
})
export class UserAuthController {
    @Validate(UserSignupSchema)
    @Post('/signup')
    signup(req: ControllerRequest, res: Response, next: NextFunction) {
        return wrapHandler((req: ControllerRequest) => {
            return initiateSignup(req.body)
        })(req, res, next);
    }
}