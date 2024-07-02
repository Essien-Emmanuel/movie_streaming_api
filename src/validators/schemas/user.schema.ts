import { z } from 'zod';

export const UserSignupSchema = z.object({
    email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'email must be of type string'
    }).trim().email(),

    password: z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be of type string'
    }).min(6, { message: 'password must be of minimum length of 6'}),

    confirmPassword: z.string({
        required_error: 'confirm password is required',
    })
}).refine(data => data.password === data.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword']
});

export type TUserSignupSchema = z.infer<typeof UserSignupSchema> 