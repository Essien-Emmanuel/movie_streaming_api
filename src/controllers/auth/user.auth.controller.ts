import { Controller, Post, Put, Validate } from "@/src/core/decorators";
import { ControllerRequest } from "@/src/core/types";
import { wrapHandler } from "@/src/core/wrapHandler";
import {
  UserLoginShcema,
  UserPasswordResetSchema,
  UserRequestEmailOtpSchema,
  UserRequestPhoneOtpSchema,
  UserSignupSchema,
  UserVerifyEmailShcema,
} from "@/src/validators/schemas/user.schema";
import { NextFunction, Response } from "express";

import {
  completeSignup,
  initiateSignup,
  requestEmailOtp,
  requestPhoneOtp,
  login,
  resetPassword,
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

  @Validate(UserVerifyEmailShcema)
  @Post("/verify-email")
  verifyEmail(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return completeSignup(req.body);
    })(req, res, next);
  }

  @Validate(UserRequestEmailOtpSchema)
  @Post("/request-email-otp")
  requestEmailOtp(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return requestEmailOtp(req.body.email);
    })(req, res, next);
  }

  @Validate(UserRequestPhoneOtpSchema)
  @Post("/request-phone-otp")
  requestPhoneOtp(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return requestPhoneOtp(req.body.phone);
    })(req, res, next);
  }

  @Validate(UserLoginShcema)
  @Post("/login")
  login(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return login(req.body);
    })(req, res, next);
  }

  @Validate(UserPasswordResetSchema)
  @Put("/password-reset/:userId")
  resetPassword(req: ControllerRequest, res: Response, next: NextFunction) {
    return wrapHandler((req: ControllerRequest) => {
      return resetPassword({ id: req.params.userId, ...req.body });
    })(req, res, next);
  }
}
