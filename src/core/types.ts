import { Request, Response, NextFunction } from 'express';

export type HandlerData = {
    statusCode?: number, 
    message: string,
    data: Record<string, any>
}

export interface ControllerRequest extends Request {
    return?: (data: HandlerData) => Response;
}

export type Controller = ( req: ControllerRequest, res: Response, next: NextFunction) => Promise<void> ;

export type ControllerArgs = {
    controller: Controller;
}
