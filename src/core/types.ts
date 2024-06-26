import { Request, Response, NextFunction } from 'express';
import { TTokenFlag } from '../types';

export type HandlerData = {
    statusCode?: number, 
    message: string,
    data: {
        [key: string]: any;
        token?: {
            flag: TTokenFlag;
            value: string;
        }
    };
}

export interface ControllerRequest extends Request {
    return?: (data: HandlerData) => Response;
}

export type Controller = ( req: ControllerRequest, res: Response, next: NextFunction) => Promise<void> ;

export type ControllerArgs = {
    controller: Controller;
}
