import { Response, NextFunction, RequestHandler } from "express";
import { defineResponse } from "./defineResponse";
import { ControllerRequest, HandlerData } from "./types";

export type HandlerFn = (req: ControllerRequest) => Promise<HandlerData>; // | (() => Promise<HandlerData>) ;

function wrapHandler(handlerFn: HandlerFn): RequestHandler {
  return async (req: ControllerRequest, res: Response, next: NextFunction) => {
    try {
      const { message, data } = await handlerFn(req);
      return res.status(200).json(defineResponse({ message, data }));
    } catch (error: any) {
      return next(error);
    }
  };
}

export { wrapHandler };
