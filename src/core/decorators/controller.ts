import 'reflect-metadata';
import {  MetadataKeys, TControllerOptions, TMiddleware } from './types';

export function Controller(options: TControllerOptions) {
    return function(target: Function, ) {        
        const middlewares: TMiddleware[] = []; 

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