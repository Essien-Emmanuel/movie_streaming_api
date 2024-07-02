import "reflect-metadata";
import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { MetadataKeys, TControllerOptions, IRouter } from '../core/decorators/types';


export class RouteLoader {
	protected router: Router;
    protected routeConfig: IRouter[];
    protected targetController: any;
    protected controllerConfig: TControllerOptions;

    constructor(targetController: any) {
        this.router = Router();
        this.targetController = new targetController();
        this.controllerConfig = Reflect.getMetadata(MetadataKeys.CONTROLLER_CONFIG, targetController) || ''
        this.routeConfig = Reflect.getMetadata(MetadataKeys.ROUTERS, this.targetController) || [];
    }

	load() {
		for (const config of this.routeConfig) {
			const { basePath, use = [] } = this.controllerConfig;

			const { httpMethod , path, handlerName } = config;
			const fullPath = `${basePath}${path || ""}`;

			const handler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
				return this.targetController[handlerName](req, res, next);
			}
	
			switch (httpMethod ) {
				case "get":
					this.router.get(fullPath, ...use, handler);
					break;
	
				case "post":
					this.router.post(fullPath,  ...use, handler);
					break;
	
				case "put":
					this.router.put(fullPath,  ...use, handler);
					break;
	
				case "patch":
					this.router.patch(fullPath,  ...use, handler);
					break;
	
				case "delete":
					this.router.delete(fullPath,  ...use, handler);
					break;
			}
		}
		return this.router;
	}
}

export const loadRouter = (controller: any ) => new RouteLoader(controller).load()
