import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Config  } from '../config';
import { APIError } from '../core/APIError';

const { env } = Config.app;

class GeneralMiddleware {
    static ErrorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
        if (res.headersSent) return

        if (error instanceof APIError) {
            return res.status(error.statusCode).json({
                status: 'error',
                name: error.name,
                code: error.statusCode,
                timestamp: Date.now(),
                ...(!(error as any).errors ? { message: error.message }: { message: error.message, errors: (error as any).errors}),
                message: error.message,
                ...(!['test', 'production'].includes(env) ? { stack: error.stack} : {})
            });
        }
        
        return res.status(500).json({
            status: 'error',
            name: "InternalServerError",
            code: 500,
            timestamp: Date.now(),
            message: "Something went wrong. Please contact our support team.",
            ...(!['test', 'production'].includes(env) ? { stack: error.stack} : {})
        });
    }

    static NotFoundHandler(req: Request, res: Response) {
        return res.status(404).json({
            status: 'error',
            name: 'NotFoundError',
            code: 404,
            timestamp: Date.now(),
            message: `${req.url} endpoint not found.`
        });
    }

    static CORS = cors();

    static DevLog(req: Request, _res: Response, next: NextFunction) {
        console.log(`- Request:: ${req.method} ${req.url}`);
        next();
    }
}

export { GeneralMiddleware }