import 'reflect-metadata';
import {  MetadataKeys, ControllerOptions, Middleware } from './types';

export function Controller(options: ControllerOptions) {
    return function(target: Function, ) {
        // Reflect.defineMetadata(MetadataKeys.BASE_PATH, options.basePath, target);
        
        const middlewares: Middleware[] = []; 

        if (options.use && options.use.length > 0) {
            for (const middleware of options.use) {
                middlewares.push(middleware);
            }
        }

        const config = {
            basePath: options.basePath,
            use: middlewares
        }

        Reflect.defineMetadata(MetadataKeys.CONTROLLER_CONFIG, config, target);
    }
}