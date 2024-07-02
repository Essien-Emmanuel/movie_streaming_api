import { z, ZodError } from 'zod';

export const validateSchema = <T extends z.ZodSchema>(schema: T, data: Record<string, any>) => {
    try {
        const parsed = schema.parse(data);
        return parsed
        
    } catch (error: any) {
        if (error instanceof ZodError) {
            console.log('error ', error)
        }
        console.log('validation error')
    }
}