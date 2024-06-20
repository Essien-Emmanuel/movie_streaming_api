import { Response, NextFunction, RequestHandler } from 'express';
import { defineResponse } from "./defineResponse";
import { ControllerArgs, ControllerRequest, TData } from './types';


function defineController({ controller }: ControllerArgs): RequestHandler {     
    return async (req: ControllerRequest, res: Response, next: NextFunction ) => {
        try {
            req.return =  (data: TData ) => res.json(defineResponse(data));
            return await controller(req, res, next)
            
        } catch (error: any) {
            next(error)
        }
    }
}

export { defineController }