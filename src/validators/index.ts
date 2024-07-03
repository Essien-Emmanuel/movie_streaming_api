import { ValidationError } from '../libs/exceptions';
import { formatZodError } from './errorFormat';
import { z, ZodError } from 'zod';

export const validateSchema = <T extends z.ZodSchema>(schema: T, data: Record<string, any>) => {
    try {
        const parsed = schema.parse(data);
        return parsed
        
    } catch (error: any) {
        if (error instanceof ZodError) {
            return formatZodError(error)
        }
        throw new ValidationError('Invalid input', error)
    }
}