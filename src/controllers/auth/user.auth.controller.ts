import { Controller, Post, Validate } from "@/src/core/decorators";
import { ControllerRequest } from "@/src/core/types";
import { wrapHandler } from "@/src/core/wrapHandler";
import { UserSignupSchema } from "@/src/validators/schemas/user.schema";
import { NextFunction, Response } from "express";

import {
  completeSignup,
  initiateSignup,
  requestEmailOtp,
} from "../../services/auth/index";

@Controller({
  basePath: "/users/auth",
})
export class UserAuthController {
  @Validate(UserSignupSchema)
  @Post("/signup")
  signup(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return initiateSignup(req.body);
    })(req, res, next);
  }

  @Post("/verify-email")
  verifyEmail(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return completeSignup(req.body);
    })(req, res, next);
  }

  @Post("/request-email-otp")
  requestEmailOtp(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return requestEmailOtp(req.body.email);
    })(req, res, next);
  }
}
