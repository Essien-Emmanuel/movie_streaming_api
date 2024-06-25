import 'reflect-metadata';
import { THttpMethods, MetadataKeys, IRouter } from './types';


export function MethodFactory(httpMethod: THttpMethods) {
    return function( path: string  = ""): MethodDecorator {
        return function(target: any, propertyName: string | symbol, descriptor: PropertyDescriptor) {
            const originalConstructor = target.constructor;

            const routers: IRouter[]  = Reflect.hasMetadata(MetadataKeys.ROUTERS, originalConstructor) ? Reflect.getMetadata(MetadataKeys.ROUTERS, originalConstructor) : [];

            routers.push({
                httpMethod,
                path,
                handlerName: propertyName
            });

            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, originalConstructor);
        }
    }
}
