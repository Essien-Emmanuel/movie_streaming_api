import 'reflect-metadata';
import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { MetadataKeys, ControllerOptions, IRouter } from '../core/decorators/types';

class RouteLoader {
    protected router: Router;
    protected routeConfig: IRouter[];
    protected targetConstructor: any;
    protected targetController: any;
    protected controllerConfig: ControllerOptions;

    constructor(targetController: any) {
        this.router = Router();
        this.targetController = targetController;
        this.controllerConfig = Reflect.getMetadata(MetadataKeys.CONTROLLER_CONFIG, targetController) || ''
        this.targetConstructor = targetController.constructor;
        this.routeConfig = Reflect.getMetadata(MetadataKeys.ROUTERS, this.targetConstructor) || [];
    }

    load(): Router {
        for (const config of this.routeConfig) {
            const { basePath, use = [] } = this.controllerConfig;

            const { handlerName, httpMethod, path} = config;
            const fullPath = `${basePath}${path || ""}`

            const controllerHandlerFn = this.targetController[handlerName];
            if (!controllerHandlerFn) continue;

            const handler: RequestHandler =   (req: Request, res: Response, next: NextFunction) => {
                const routeHandlerFn = controllerHandlerFn();
                routeHandlerFn(req, res, next)
            }
            switch (httpMethod) {
                case 'get':
                    this.router.get(fullPath, ...use, handler);
                    break       
                case 'post':
                    this.router.post(fullPath, ...use, handler);
                    break       
                case 'put':
                    this.router.put(fullPath, ...use, handler);
                    break       
                case 'patch':
                    this.router.patch(fullPath, ...use, handler);
                    break       
                case 'delete':
                    this.router.delete(fullPath, ...use, handler);
                    break       
                case 'options':
                    this.router.options(fullPath, ...use, handler);
                    break       
                default:
                    throw new Error(`Unsupported HTTP method: ${httpMethod}`);;
           }

        }
       return this.router

    }
}
export { RouteLoader }
