import 'reflect-metadata';
import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { MetadataKeys, IRouter } from '../core/decorators/types';

class RouteLoader {
    protected router: Router;
    protected routeConfig: IRouter[];
    protected targetConstructor: any;
    protected targetController: any;
    protected basePath: string;

    constructor(targetController: any) {
        this.router = Router();
        this.targetController = targetController;
        this.basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, targetController) || ''
        this.targetConstructor = targetController.constructor;
        this.routeConfig = Reflect.getMetadata(MetadataKeys.ROUTERS, this.targetConstructor) || [];
    }

    load(): Router {
        for (const config of this.routeConfig) {

            const { handlerName, httpMethod, path} = config;
            const fullPath = `${this.basePath}${path || ""}`

            const handler: RequestHandler =   (req: Request, res: Response, next: NextFunction) => {
                const controllerHandlerFn = this.targetController[handlerName]
                const routeHandlerFn = controllerHandlerFn();
                routeHandlerFn(req, res, next)
            }
            switch (httpMethod) {
                case 'get':
                    this.router.get(fullPath, handler);
                    break       
                case 'post':
                    this.router.post(fullPath, handler);
                    break       
                case 'put':
                    this.router.put(fullPath, handler);
                    break       
                case 'patch':
                    this.router.patch(fullPath, handler);
                    break       
                case 'delete':
                    this.router.delete(fullPath, handler);
                    break       
                case 'options':
                    this.router.options(fullPath, handler);
                    break       
                default:
                throw new Error(`Unsupported HTTP method: ${httpMethod}`);;
           }

        }
       return this.router

    }
}
export { RouteLoader }
