import { z } from "zod";

export const UserSignupSchema = z
  .object({
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email must be of type string",
      })
      .trim()
      .email(),

    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be of type string",
      })
      .min(6, { message: "password must be of minimum length of 6" }),

    confirmPassword: z.string({
      required_error: "confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export type TUserSignupSchema = z.infer<typeof UserSignupSchema>;

export const UserPasswordResetSchema = z
  .object({
    // id: z.number({
    //   required_error: "id is required",
    //   invalid_type_error: "id must be of type number",
    // }),

    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be of type string",
      })
      .min(6, { message: "password must be of minimum length of 6" }),

    confirmPassword: z.string({
      required_error: "confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export type TUserPasswordResetSchema = z.infer<typeof UserPasswordResetSchema>;

export const UserRequestEmailOtpSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be of type string",
    })
    .trim()
    .email(),
});

export const UserRequestPhoneOtpSchema = z.object({
  phone: z
    .string({
      required_error: "phone is required",
      invalid_type_error: "phone must be of type string",
    })
    .trim(),
});

export type TUserRequestEmailOtpSchema = z.infer<
  typeof UserRequestEmailOtpSchema
>;

export const UserRequestPasswordResetSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be of type string",
    })
    .trim()
    .email(),
});

export type TUserRequestPasswordResetSchema = z.infer<
  typeof UserRequestPasswordResetSchema
>;

export const UserLoginShcema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be of type string",
    })
    .trim()
    .email(),

  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be of type string",
    })
    .min(6, { message: "password must be of minimum length of 6" }),
});

export type TUserLoginSchema = z.infer<typeof UserLoginShcema>;

export const UserVerifyEmailShcema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be of type string",
    })
    .trim()
    .email(),

  otp: z
    .string({
      required_error: "otp is required",
      invalid_type_error: "otp must be of type string",
    })
    .min(6, { message: "otp must be of minimum length of 6" }),
});

export type TUserVerifyEmailSchema = z.infer<typeof UserVerifyEmailShcema>;
