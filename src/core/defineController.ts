import { Response, NextFunction, RequestHandler } from 'express';
import { defineResponse } from "./defineResponse";
import { ControllerArgs, ControllerRequest, HandlerData } from './types';


function defineController({ controller }: ControllerArgs): RequestHandler {     
    return async (req: ControllerRequest, res: Response, next: NextFunction ) => {
        try {
            req.return =  (data: HandlerData ) => res.json(defineResponse(data));
            return await controller(req, res, next)
            
        } catch (error: any) {
            next(error)
        }
    }
}

export { defineController }